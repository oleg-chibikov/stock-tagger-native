import React, { FunctionComponent, useState } from 'react';
import { Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ImagePickerAsset } from 'expo-image-picker';
import getEnvVars from '../environment';
import { uploadImageAndGetTags } from '../api/imaggaApi';

interface ImageSelectorProps {
  images: ImagePickerAsset[];
  onImagesSelected: (images: ImagePickerAsset[]) => void;
}

const ImageSelector: FunctionComponent<ImageSelectorProps> = ({ images, onImagesSelected }) => {
  const [selectedImages, setSelectedImages] = useState<ImagePickerAsset[]>([]);

  function toggleImageSelection(image: ImagePickerAsset) {
    if (selectedImages.includes(image)) {
      setSelectedImages(selectedImages.filter((img) => img !== image));
    } else {
      setSelectedImages([...selectedImages, image]);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.imageContainer}>
      {images.map((image, index) => (
        <TouchableOpacity key={index} onPress={() => toggleImageSelection(image)}>
          <Image source={{ uri: image.uri }} style={styles.image} />
          {selectedImages.includes(image) && <Text style={styles.checkmark}>✓</Text>}
        </TouchableOpacity>
      ))}
      <Button title="Done" onPress={() => onImagesSelected(selectedImages)} />
    </ScrollView>
  );
};

interface Tag {
  confidence: number;
  tag: {
    en: string;
  };
}

async function uploadImages(images: ImagePickerAsset[]): Promise<Tag[][]> {
  const responses = await Promise.all(
    images.map(uploadImageAndGetTags)
  );

  const data = await Promise.all(responses.map((response) => response));
  return data.map((item) => item);
}

const ImageUploader: FunctionComponent = () => {
  const [images, setImages] = useState<ImagePickerAsset[]>([]);
  const [selectedImages, setSelectedImages] = useState<ImagePickerAsset[]>([]);
  const [tags, setTags] = useState<Tag[][]>([]);

  async function pickImages() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      base64: true
    });

    if (!result.canceled) {
      setImages(result.assets as ImagePickerAsset[]);
    }
  }

  async function getTags() {
    const tags = await uploadImages(selectedImages);
    setTags(tags);
  }

  return (
    <View style={styles.container}>
      <Button title="Select Images" onPress={pickImages} />
      <ImageSelector images={images} onImagesSelected={(a)=>{setSelectedImages(a); getTags()}} />
      {tags.map((imageTags, index) => (
        <View key={index}>
          <Text>Image {index + 1}:</Text>
          {imageTags.map((tag, index) => (
            <Text key={index}>{tag.tag.en}</Text>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
  },
  image: {
    width: 100,
    height: 100,
    margin: 4,
  },
  checkmark: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'white',
    borderRadius: 12,
    width: 24,
    height: 24,
    textAlign: 'center',
    lineHeight: 24,
  },
});

export { ImageUploader };
