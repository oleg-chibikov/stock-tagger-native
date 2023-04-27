import { ImagePickerAsset } from 'expo-image-picker';
import { FunctionComponent, useState } from 'react';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

interface ImageSelectorProps {
  images: ImagePickerAsset[];
  onImagesSelected: (images: ImagePickerAsset[]) => void;
}

const ImageSelector: FunctionComponent<ImageSelectorProps> = ({
  images,
  onImagesSelected,
}) => {
  const [selectedImages, setSelectedImages] = useState<ImagePickerAsset[]>([]);

  function toggleImageSelection(image: ImagePickerAsset) {
    if (selectedImages.includes(image)) {
      setSelectedImages(selectedImages.filter((img) => img !== image));
    } else {
      setSelectedImages([...selectedImages, image]);
    }
  }

  return (
    <>
      <ScrollView contentContainerStyle={styles.imageContainer}>
        {images.map((image, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => toggleImageSelection(image)}
          >
            <Image source={{ uri: image.uri }} style={styles.image} />
            {selectedImages.includes(image) && (
              <Text style={styles.checkmark}>✓</Text>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
      {images.length > 0 && (
        <Button
          title="Get tags"
          onPress={() =>
            onImagesSelected(
              selectedImages.length ? selectedImages : [images[0]]
            )
          }
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 16,
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

export { ImageSelector };
