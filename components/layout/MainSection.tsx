import React, { useState } from 'react';
import { Button, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { UploadOperation, upscaleAndUploadToStock } from '../../api/backendApi';
import { pickImages } from '../../helpers/imageHelper';
import { setImages } from '../../store/imageSlice';
import { useAppSelector } from '../../store/store';
import { setTags } from '../../store/tagSlice';
import { ImageSelector } from '../ImageSelector';
import { ProgressLoader, ProgressState } from '../ProgressLoader';
import { ContainerStyleProps } from '../Themed';

const MainSection: React.FunctionComponent<ContainerStyleProps> = ({
  style,
}) => {
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<
    Record<string, ProgressState>
  >({});
  const images = useAppSelector((state) => state.image.images);
  const dispatch = useDispatch();

  const selectImages = async () => {
    const newImages = await pickImages();
    if (newImages) {
      dispatch(setImages(newImages));
      dispatch(setTags([]));
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
    await upscaleAndUploadToStock(images, (imageName, progress, operation) => {
      setUploadProgress((prevUploadProgress) => ({
        ...prevUploadProgress,
        [imageName]: { progress, operation },
      }));
    });
    setLoading(false);
  }

  return (
    <View style={style}>
      {loading ? (
        <ProgressLoader uploadProgress={uploadProgress} />
      ) : (
        <>
          <Button title="Select Images" onPress={selectImages} />
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
