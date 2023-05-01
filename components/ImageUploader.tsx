import * as DocumentPicker from 'expo-document-picker';
import React, { FunctionComponent, useState } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';
import { uploadImageToBackend } from '../api/backendApi';
import { uploadImageAndGetTags } from '../api/imaggaApi';
import { downloadCSV } from '../helpers/csvHelper';
import { fileToUri, ImageWithData } from '../helpers/fileHelper';
import { getUniqueTags, Tag } from '../helpers/tagHelper';
import { ImageSelector } from './ImageSelector';
import { Tags } from './Tags';
import { Text, View } from './Themed';

async function uploadImagesAndGetTags(
  imageData: ImageWithData[]
): Promise<Tag[][]> {
  const responses = await Promise.all(imageData.map(uploadImageAndGetTags));

  return responses;
}

async function uploadImagesToBackend(
  imageData: ImageWithData[],
  onProgress: (imageName: string, progress: number) => void
) {
  const responses = await Promise.all(
    imageData.map((image) =>
      uploadImageToBackend(image, (transferred, total) => {
        const progress = transferred / total;
        onProgress(image.name, progress);
      })
    )
  );
  if (!responses.every(Boolean)) {
    const failedNames = responses
      .map((response, index) => [response, imageData[index].name])
      .filter(([response]) => !response)
      .map(([, name]) => name);
    Alert.alert(
      'Upload Failed',
      `Failed to upload images: ${failedNames.join(', ')}`
    );
  }
}

const getImageData = async (file: File): Promise<ImageWithData> => {
  const uri = await fileToUri(file);
  return { name: file.name, uri: uri, file: file };
};

const pickImages = async (): Promise<ImageWithData[] | null> => {
  const result = await DocumentPicker.getDocumentAsync({
    type: 'image/*',
    multiple: true,
    copyToCacheDirectory: true,
  });

  if (result.type !== 'cancel') {
    if (result.output) {
      return await Promise.all(Array.from(result.output).map(getImageData));
    }
    return result.file ? [await getImageData(result.file)] : null;
  }

  return null;
};

const ImageUploader: FunctionComponent = () => {
  const [images, setImages] = useState<ImageWithData[]>([]);
  const [tags, setTags] = useState<Tag[][]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>(
    {}
  );

  const updateImages = async () => {
    const images = await pickImages();
    if (images) {
      setImages(images);
    }
  };

  async function getTags(selectedImages: ImageWithData[]) {
    setLoading(true);

    const uploadImagesAndGetTagsPromise =
      uploadImagesAndGetTags(selectedImages);
    // Declare the type of the initial progress object as Record<string, number>
    const initialProgress: Record<string, number> = {};
    // Loop through the images and set the progress to 0
    for (const image of images) {
      initialProgress[image.name] = 0;
    }
    // Set the upload progress state to the initial progress object
    setUploadProgress(initialProgress);
    const uploadImagesToBackendPromise = uploadImagesToBackend(
      images,
      (imageName, progress) => {
        setUploadProgress((prevUploadProgress) => ({
          ...prevUploadProgress,
          [imageName]: progress,
        }));
      }
    );
    await Promise.all([
      uploadImagesAndGetTagsPromise,
      uploadImagesToBackendPromise,
    ]);
    const tags = await uploadImagesAndGetTagsPromise;
    setTags(tags);
    const uniqueTags = getUniqueTags(tags, true);
    downloadCSV(images, uniqueTags, 'tags', 1);
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <>
          <ActivityIndicator size="large" />
          {Object.keys(uploadProgress).map((imageName) => (
            <View key={imageName}>
              <Text>{imageName}</Text>
              <Progress.Bar progress={uploadProgress[imageName]} />
            </View>
          ))}{' '}
        </>
      ) : (
        <>
          <Button title="Select Images" onPress={updateImages} />
          <ImageSelector
            images={images}
            onImagesSelected={(assets) => {
              getTags(assets);
            }}
          />
          <Tags tags={tags} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export { ImageUploader };
