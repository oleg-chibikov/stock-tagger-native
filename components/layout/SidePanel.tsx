import React, { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { categories } from '../../constants/Categories';
import { downloadCSV } from '../../helpers/csvHelper';
import { useAppSelector } from '../../store/store';
import { LabeledInput } from '../core/LabeledInput';
import { LabeledPicker } from '../core/LabeledPicker';
import { HelpIcon } from '../HelpIcon';
import { NewTag } from '../tags/NewTag';
import { RetrieveTagsButton } from '../tags/RetrieveTagsButton';
import { Tags } from '../tags/Tags';
import { ContainerStyleProps } from '../Themed';

const SidePanel: React.FunctionComponent<ContainerStyleProps> = ({
  containerStyle,
}) => {
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
    <View style={[containerStyle, styles.sidePanel]}>
      <HelpIcon />
      <LabeledInput
        labelWidth={labelWidth}
        label="Title"
        value={title}
        onChangeText={setTitle}
        placeholder="Enter common title for all the images"
        containerStyle={styles.marginTop}
      />
      <LabeledPicker
        labelWidth={labelWidth}
        label="Category"
        value={category}
        onValueChange={(value) => setCategory(value as number)}
        items={categories}
        containerStyle={styles.marginTop}
      />
      {Boolean(images.length) && (
        <>
          <RetrieveTagsButton
            selectedImages={
              selectedImages.length ? selectedImages : [images[0]]
            }
            containerStyle={styles.marginTop}
          />
          <NewTag containerStyle={styles.marginTop} />
          <Tags containerStyle={styles.marginTop} />
          {hasTags && <Button title="Download tags" onPress={downloadTags} />}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  marginTop: { marginTop: 10 },
  sidePanel: {
    backgroundColor: '#222',
    padding: 20,
  },
});

export { SidePanel };
