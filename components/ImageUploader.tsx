import * as ImagePicker from 'expo-image-picker';
import { ImagePickerAsset } from 'expo-image-picker';
import React, { FunctionComponent, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, View } from 'react-native';
import { uploadImageAndGetTags } from '../api/imaggaApi';
import { ImageSelector } from './ImageSelector';
import { Tag, Tags } from './Tags';

async function uploadImages(images: ImagePickerAsset[]): Promise<Tag[][]> {
  const responses = await Promise.all(images.map(uploadImageAndGetTags));

  const data = await Promise.all(responses.map((response) => response));
  const tags = data.map((item) => item);

  return tags;
}

const csvSplitter = ',';

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

function createCSVData(
  images: ImagePickerAsset[],
  tags: string[],
  title: string,
  category: number
): string {
  const rows = images.map((image) => {
    return {
      Filename: image.fileName || '',
      Title: title,
      Keywords: tags
        .map((x) => (x.indexOf(csvSplitter) >= 0 ? `\"${x}\"` : x))
        .join(csvSplitter),
      Category: category.toString(),
      Releases: '',
    };
  });

  // Create CSV data
  const header = Object.keys(rows[0]).join(csvSplitter);
  const csvData =
    header +
    '\n' +
    rows.map((row) => Object.values(row).join(csvSplitter)).join('\n');

  return csvData;
}

function downloadCSV(
  images: ImagePickerAsset[],
  tags: string[],
  title: string,
  category: number
) {
  const csvData = createCSVData(images, tags, title, category);

  // Create a Blob from the CSV data
  const blob = new Blob([csvData], { type: 'text/csv' });
  // Create a downloadable link for the Blob
  const url = URL.createObjectURL(blob);
  // Create an anchor element and simulate a click to download the file
  const a = document.createElement('a');
  a.href = url;
  a.download = title + '.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
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
      <Button title="Select Images" onPress={pickImages} />
      <ImageSelector
        images={images}
        onImagesSelected={(assets) => {
          getTags(assets);
        }}
      />
      {loading ? <ActivityIndicator size="large" /> : <Tags tags={tags} />}
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
