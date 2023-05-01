import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';
import { FunctionComponent, useState } from 'react';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Popable } from 'react-native-popable';
import { ImageWithData } from '../helpers/fileHelper';
import { Text } from './Themed';

interface ImageSelectorProps {
  images: ImageWithData[];
  onImagesSelected: (images: ImageWithData[]) => void;
}

const ImageSelector: FunctionComponent<ImageSelectorProps> = ({
  images,
  onImagesSelected,
}) => {
  const [selectedImages, setSelectedImages] = useState<ImageWithData[]>([]);
  const theme = useTheme();

  function toggleImageSelection(image: ImageWithData) {
    if (selectedImages.includes(image)) {
      setSelectedImages(selectedImages.filter((img) => img !== image));
    } else {
      setSelectedImages([...selectedImages, image]);
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

      <Popable
        action="hover"
        content={`Select the images for which you'd like to get the tags.

            Tags will be downloaded as a CSV file and you'll need to upload them to Adobe stock manually.

            Tags will be applied to all the images regardless of the selection and will be submitted to the stock.

            Without the selection only the first image will be used for tag retrieval.
            `}
        position="bottom"
        style={{ width: 500 }}
      >
        <Ionicons
          style={styles.info}
          name="information-circle-outline"
          size={50}
          color={theme.colors.primary}
        />
      </Popable>
      <Button
        title="Process images"
        onPress={() =>
          onImagesSelected(selectedImages.length ? selectedImages : [images[0]])
        }
      />
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
  info: {
    paddingBottom: 16,
  },
});

export { ImageSelector };
