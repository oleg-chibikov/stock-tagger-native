import { FunctionComponent } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text, View } from './Themed';

interface TagsProps {
  tags: string[];
}

const Tags: FunctionComponent<TagsProps> = ({ tags }) => (
  <ScrollView contentContainerStyle={styles.imageContainer}>
    <View>
      {tags.map((tag, index) => (
        <Text key={index}>{tag}</Text>
      ))}
    </View>
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
