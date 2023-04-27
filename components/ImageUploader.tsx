import * as ImagePicker from 'expo-image-picker';
import { ImagePickerAsset } from 'expo-image-picker';
import React, { FunctionComponent, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, View } from 'react-native';
import { uploadImageAndGetTags } from '../api/imaggaApi';
import { downloadCSV } from '../helpers/csvHelper';
import { ImageSelector } from './ImageSelector';
import { Tag, Tags } from './Tags';

async function uploadImages(images: ImagePickerAsset[]): Promise<Tag[][]> {
  const responses = await Promise.all(images.map(uploadImageAndGetTags));

  const data = await Promise.all(responses.map((response) => response));
  const tags = data.map((item) => item);

  return tags;
}

function getUniqueTags(tags: Tag[][], isAi: boolean): string[] {
  // Extract unique tags from the 'en' field
  const uniqueTags = Array.from(
    new Set(tags.flatMap((tags) => tags.map((tag) => tag.tag.en)))
  );
  const updatedTags = uniqueTags.slice(0, isAi ? 47 : 50); // not more than 50 images
  if (isAi) {
    updatedTags.push('Generative AI');
    updatedTags.push('Generative');
    updatedTags.push('AI');
  }
  return updatedTags;
}

const ImageUploader: FunctionComponent = () => {
  const [images, setImages] = useState<ImagePickerAsset[]>([]);
  const [tags, setTags] = useState<Tag[][]>([]);
  const [loading, setLoading] = useState(false);

  async function pickImages() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      base64: true,
    });

    if (!result.canceled) {
      setImages(result.assets as ImagePickerAsset[]);
    }
  }

  async function getTags(assets: ImagePicker.ImagePickerAsset[]) {
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
          <Button title="Select Images" onPress={pickImages} />
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
