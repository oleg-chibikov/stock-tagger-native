import { FunctionComponent } from 'react';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Text } from './Themed';

interface ImageSelectorProps {
  onProcess: () => void;
}

import React from 'react';
import { useDispatch } from 'react-redux';
import { ImageWithData } from '../helpers/fileHelper';
import { setSelectedImages } from '../store/imageSlice';
import { useAppSelector } from '../store/store';

interface ImageSelectorProps {
  onProcess: () => void;
}

const ImageSelector: FunctionComponent<ImageSelectorProps> = ({
  onProcess,
}) => {
  const images = useAppSelector((state) => state.image.images);
  const selectedImages = useAppSelector((state) => state.image.selectedImages);
  const dispatch = useDispatch();

  function toggleImageSelection(image: ImageWithData) {
    if (selectedImages.includes(image)) {
      dispatch(
        setSelectedImages(selectedImages.filter((img) => img !== image))
      );
    } else {
      dispatch(setSelectedImages([...selectedImages, image]));
    }
  }

  return (
    <>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.imageContainer}
      >
        {images.map((image, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => toggleImageSelection(image)}
            >
              <Image source={{ uri: image.uri }} style={styles.image} />
              {selectedImages.includes(image) && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <Button title="Upscale and upload images to stock" onPress={onProcess} />
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 0,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
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
    color: 'black',
    borderRadius: 12,
    width: 24,
    height: 24,
    textAlign: 'center',
    lineHeight: 24,
  },
});

export { ImageSelector };
