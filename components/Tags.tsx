import { FunctionComponent } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Tag } from '../helpers/tagHelper';
import { Text, View } from './Themed';

interface TagsProps {
  tags: Tag[][];
}

const Tags: FunctionComponent<TagsProps> = ({ tags }) => (
  <ScrollView contentContainerStyle={styles.imageContainer}>
    {tags.map((imageTags, index) => (
      <View key={index}>
        <Text>Image {index + 1}:</Text>
        {imageTags.map((tag, index) => (
          <Text key={index}>{tag.tag.en}</Text>
        ))}
      </View>
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
  },
});

export { Tags };
