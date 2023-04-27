import React, { FunctionComponent, useState } from 'react';
import { Button, Image, ScrollView, StyleSheet, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ImagePickerAsset } from 'expo-image-picker';

const ImageUploader: FunctionComponent = ()=> {
  const [images, setImages] = useState<ImagePickerAsset[]>([]);

  async function pickImages() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      setImages(result.assets as ImagePickerAsset[]);
    }
  }

  return (
    <View style={styles.container}>
      <Button title="Select Images" onPress={pickImages} />
      <ScrollView contentContainerStyle={styles.imageContainer}>
        {images.map((image, index) => (
          <Image key={index} source={{ uri: image.uri }} style={styles.image} />
        ))}
      </ScrollView>
    </View>
  );
}

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
});

export {ImageUploader}