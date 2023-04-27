import * as ImagePicker from 'expo-image-picker';
import { ImagePickerAsset } from 'expo-image-picker';
import React, { FunctionComponent, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { uploadImageAndGetTags } from '../api/imaggaApi';
import { ImageSelector } from './ImageSelector';
import { Tag, Tags } from './Tags';

async function uploadImages(images: ImagePickerAsset[]): Promise<Tag[][]> {
  const responses = await Promise.all(images.map(uploadImageAndGetTags));

  const data = await Promise.all(responses.map((response) => response));
  return data.map((item) => item);
}

const ImageUploader: FunctionComponent = () => {
  const [images, setImages] = useState<ImagePickerAsset[]>([]);
  const [tags, setTags] = useState<Tag[][]>([]);

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
    const tags = await uploadImages(assets);
    setTags(tags);
  }

  return (
    <View style={styles.container}>
      <Button title="Select Images" onPress={pickImages} />
      <ImageSelector
        images={images}
        onImagesSelected={(assets) => {
          getTags(assets);
        }}
      />
      <Tags tags={tags} />
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
