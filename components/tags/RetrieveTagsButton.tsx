import React, { useState } from 'react';
import { ActivityIndicator, Button, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Caption, getCaptionsFromBackend } from '../../api/backendApi';
import { uploadImageAndGetTags } from '../../api/imaggaApi';
import { getUniqueTags } from '../../helpers/tagHelper';
import { useAppSelector } from '../../store/store';
import { setTags } from '../../store/tagSlice';
import { ContainerStyleProps } from '../Themed';

interface RetrieveTagsButtonProps extends ContainerStyleProps {
  onCaptionsRetrieved: (captions: Caption[]) => void;
}

const RetrieveTagsButton: React.FunctionComponent<RetrieveTagsButtonProps> = ({
  onCaptionsRetrieved,
  style,
}) => {
  const selectedImages = useAppSelector((state) => state.image.selectedImages);
  const images = useAppSelector((state) => state.image.images);
  const [loading, setLoading] = useState(false);
  const tags = useAppSelector((state) => state.tag.tags);
  const dispatch = useDispatch();

  const imagesToUse = selectedImages.length ? selectedImages : [images[0]];

  const retrieveTags = async () => {
    const retrievedTags = [];

    for (const image of imagesToUse) {
      const tags = await uploadImageAndGetTags(image);
      retrievedTags.push(tags);
    }
    const uniqueTags = getUniqueTags(retrievedTags, tags, true);
    dispatch(setTags(uniqueTags));
  };

  const retrieveCaptions = async () => {
    const captions = await getCaptionsFromBackend(imagesToUse);
    onCaptionsRetrieved(captions);
  };

  const handlePress = async () => {
    setLoading(true);
    await Promise.all([retrieveTags(), retrieveCaptions()]);
    setLoading(false);
  };

  return (
    <View style={style}>
      <Button
        title="Retrieve Tags and Captions"
        onPress={handlePress}
        disabled={loading}
      />
      {loading && (
        <ActivityIndicator size={'large'} style={{ marginTop: 10 }} />
      )}
    </View>
  );
};

export { RetrieveTagsButton };
