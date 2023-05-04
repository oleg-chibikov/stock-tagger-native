import React, { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { categories } from '../../constants/Categories';
import { downloadCSV } from '../../helpers/csvHelper';
import { useAppSelector } from '../../store/store';
import { ComboBoxItem } from '../core/ComboBox';
import { LabeledPicker } from '../core/LabeledPicker';
import { HelpIcon } from '../HelpIcon';
import { NewTag } from '../tags/NewTag';
import { RetrieveTagsButton } from '../tags/RetrieveTagsButton';
import { Tags } from '../tags/Tags';
import { ContainerStyleProps } from '../Themed';

const SidePanel: React.FunctionComponent<ContainerStyleProps> = ({ style }) => {
  const tags = useAppSelector((state) => state.tag.tags);
  const images = useAppSelector((state) => state.image.images);
  const hasTags = tags.length > 0;
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<number>();
  const [captions, setCaptions] = useState<ComboBoxItem<string>[]>([]);

  const downloadTags = () => {
    downloadCSV(images, tags, title, category);
  };

  const labelWidth = '80px';

  return (
    <View style={[style, styles.sidePanel]}>
      <HelpIcon style={{ zIndex: 3 }} />
      <LabeledPicker<string>
        labelWidth={labelWidth}
        label="Title"
        value={title}
        onSelect={(value) => setTitle(value as string)}
        items={captions}
        style={(styles.marginTop, { zIndex: 2 })}
      />
      <LabeledPicker<number | null>
        editable={false}
        labelWidth={labelWidth}
        label="Category"
        value={category}
        onSelect={(value) => setCategory(value as number)}
        items={categories}
        style={[styles.marginTop, { zIndex: 1 }]}
      />
      {Boolean(images.length) && (
        <>
          <RetrieveTagsButton
            onCaptionsRetrieved={(values) => {
              setCaptions(
                values.map((x) => ({
                  label: x.caption,
                  value: x.caption,
                }))
              );
            }}
            style={styles.marginTop}
          />
          <NewTag style={styles.marginTop} />
          <Tags style={styles.marginTop} />
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
