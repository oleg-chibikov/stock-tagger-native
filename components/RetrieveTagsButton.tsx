import React, { useState } from 'react';
import { ActivityIndicator, Button, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { uploadImageAndGetTags } from '../api/imaggaApi';
import { ImageWithMetadata } from '../helpers/fileHelper';
import { getUniqueTags } from '../helpers/tagHelper';
import { useAppSelector } from '../store/store';
import { setTags } from '../store/tagSlice';
import { ContainerStyleProps } from './Themed';

interface RetrieveTagsButtonProps extends ContainerStyleProps {
  selectedImages: ImageWithMetadata[];
}

const RetrieveTagsButton: React.FunctionComponent<RetrieveTagsButtonProps> = ({
  selectedImages,
  containerStyle,
}) => {
  const [loading, setLoading] = useState(false);
  const tags = useAppSelector((state) => state.tag.tags);
  const dispatch = useDispatch();

  const retrieveTags = async () => {
    const retrievedTags = await Promise.all(
      selectedImages.map(uploadImageAndGetTags)
    );
    const uniqueTags = getUniqueTags(retrievedTags, tags, true);
    dispatch(setTags(uniqueTags));
  };

  const handlePress = async () => {
    setLoading(true);
    await retrieveTags();
    setLoading(false);
  };

  return (
    <View style={containerStyle}>
      <Button title="Retrieve Tags" onPress={handlePress} disabled={loading} />
      {loading && <ActivityIndicator />}
    </View>
  );
};

export { RetrieveTagsButton };
