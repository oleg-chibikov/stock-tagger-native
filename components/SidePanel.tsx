import React, { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { categories } from '../constants/Categories';
import { downloadCSV } from '../helpers/csvHelper';
import { useAppSelector } from '../store/store';
import { HelpIcon } from './core/HelpIcon';
import { LabeledInput } from './core/LabeledInput';
import { LabeledPicker } from './core/LabeledPicker';
import { RetrieveTagsButton } from './RetrieveTagsButton';
import { Tags } from './Tags';

const SidePanel: React.FunctionComponent = () => {
  const tags = useAppSelector((state) => state.tag.tags);
  const images = useAppSelector((state) => state.image.images);
  const selectedImages = useAppSelector((state) => state.image.selectedImages);
  const hasTags = tags.length > 0;
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<number>();

  const downloadTags = () => {
    downloadCSV(images, tags, title, category);
  };

  const labelWidth = '80px';

  return (
    <View style={styles.sidePanel}>
      <View style={styles.topRow}>
        <HelpIcon />
        {Boolean(images.length) && (
          <RetrieveTagsButton
            selectedImages={
              selectedImages.length ? selectedImages : [images[0]]
            }
            containerStyle={styles.RetrieveTagsButton}
          />
        )}
      </View>
      <LabeledInput
        labelWidth={labelWidth}
        label="Title"
        value={title}
        onChangeText={setTitle}
        placeholder="Enter common title for all the images"
        containerStyle={{ marginTop: 10 }}
      />
      <LabeledPicker
        labelWidth={labelWidth}
        label="Category"
        value={category}
        onValueChange={(value) => setCategory(value as number)}
        items={categories}
        containerStyle={{ marginTop: 10 }}
      />
      <Tags containerStyle={{ marginTop: 10 }} />
      {hasTags && <Button title="Download tags" onPress={downloadTags} />}
    </View>
  );
};

const styles = StyleSheet.create({
  sidePanel: {
    flex: 0.4,
    height: '700px',
    backgroundColor: '#222',
    padding: 20,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  RetrieveTagsButton: {
    flex: 1,
    marginLeft: 10,
  },
});

export { SidePanel };
