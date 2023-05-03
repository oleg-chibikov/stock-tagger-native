import React, { useState } from 'react';
import { Button, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { uploadImagesToBackend, UploadOperation } from '../../api/backendApi';
import { pickImages } from '../../helpers/imageHelper';
import { setImages } from '../../store/imageSlice';
import { useAppSelector } from '../../store/store';
import { ImageSelector } from '../ImageSelector';
import { ProgressLoader, ProgressState } from '../ProgressLoader';
import { ContainerStyleProps } from '../Themed';

const MainSection: React.FunctionComponent<ContainerStyleProps> = ({
  containerStyle,
}) => {
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<
    Record<string, ProgressState>
  >({});
  const images = useAppSelector((state) => state.image.images);
  const dispatch = useDispatch();

  const updateImages = async () => {
    const newImages = await pickImages();
    if (newImages) {
      dispatch(setImages(newImages));
    }
  };

  async function processImages() {
    setLoading(true);
    const initialProgress: Record<string, ProgressState> = {};
    for (const image of images) {
      initialProgress[image.name] = {
        progress: 0,
        operation: UploadOperation.Unknown,
      };
    }
    setUploadProgress(initialProgress);
    await uploadImagesToBackend(images, (imageName, progress, operation) => {
      setUploadProgress((prevUploadProgress) => ({
        ...prevUploadProgress,
        [imageName]: { progress, operation },
      }));
    });
    setLoading(false);
  }

  return (
    <View style={containerStyle}>
      {loading ? (
        <ProgressLoader uploadProgress={uploadProgress} />
      ) : (
        <>
          <Button title="Select Images" onPress={updateImages} />
          {Boolean(images.length) && (
            <>
              <ImageSelector
                onProcess={() => {
                  processImages();
                }}
              />
            </>
          )}
        </>
      )}
    </View>
  );
};

export { MainSection };
