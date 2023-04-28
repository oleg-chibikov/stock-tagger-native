import * as DocumentPicker from 'expo-document-picker';
import React, { FunctionComponent, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, View } from 'react-native';
import { uploadImageAndGetTags } from '../api/imaggaApi';
import { downloadCSV } from '../helpers/csvHelper';
import { fileToUri, ImageWithData } from '../helpers/fileHelper';
import { getUniqueTags, Tag } from '../helpers/tagHelper';
import { ImageSelector } from './ImageSelector';
import { Tags } from './Tags';

async function uploadImages(imageData: ImageWithData[]): Promise<Tag[][]> {
  const responses = await Promise.all(imageData.map(uploadImageAndGetTags));

  return await Promise.all(responses.map((response) => response));
}

const getImageData = async (file: File): Promise<ImageWithData> => {
  const uri = await fileToUri(file);
  return { name: file.name, uri: uri };
};

const pickImages = async (): Promise<ImageWithData[] | null> => {
  let result = await DocumentPicker.getDocumentAsync({
    type: 'image/*',
    multiple: true,
    copyToCacheDirectory: true,
  });

  if (result.type !== 'cancel') {
    return result.output
      ? await Promise.all(Array.from(result.output).map(getImageData))
      : result.file
      ? [await getImageData(result.file)]
      : null;
  }

  return null;
};

const ImageUploader: FunctionComponent = () => {
  const [images, setImages] = useState<ImageWithData[]>([]);
  const [tags, setTags] = useState<Tag[][]>([]);
  const [loading, setLoading] = useState(false);

  const updateImages = async () => {
    const images = await pickImages();
    if (images) {
      setImages(images);
    }
  };

  // async function pickImages() {
  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsMultipleSelection: true,
  //     base64: true,
  //   });

  //   if (!result.canceled) {
  //     setImages(result.assets as Uint8Array[]);
  //   }
  // }

  async function getTags(assets: ImageWithData[]) {
    setLoading(true);
    const tags = await uploadImages(assets);
    setTags(tags);
    const uniqueTags = getUniqueTags(tags, true);
    downloadCSV(images, uniqueTags, 'tags', 1);
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
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
