import React, { FunctionComponent, useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { maxTags } from '../helpers/tagHelper';
import { useAppSelector } from '../store/store';
import { prependTag } from '../store/tagSlice';
import { commonStyles } from './Themed';

const NewTag: FunctionComponent = () => {
  const dispatch = useDispatch();
  const handlePrependTag = (tag: string) => {
    dispatch(prependTag(tag));
  };
  const [newTag, setNewTag] = useState('');
  const tags = useAppSelector((state) => state.tag.tags);
  const handleAddTag = () => {
    if (newTag) {
      // TODO: can we store set in redux instead of array
      const set = new Set(tags);
      if (!set.has(newTag)) {
        handlePrependTag(newTag.trim());
      }
      setNewTag('');
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        value={newTag}
        onChangeText={setNewTag}
        placeholder="Enter new tag"
        style={[commonStyles.input, { marginRight: 8, flex: 1 }]}
      />
      <Button
        title="Add"
        disabled={!newTag.trim().length || tags.length >= maxTags}
        onPress={handleAddTag}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center' },
});

export { NewTag };
