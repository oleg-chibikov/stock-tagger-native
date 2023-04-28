import { useTheme } from '@react-navigation/native';
import { FunctionComponent } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Tag } from '../helpers/tagHelper';

interface TagsProps {
  tags: Tag[][];
}

const Tags: FunctionComponent<TagsProps> = ({ tags }) => {
  const { colors } = useTheme();
  return (
    <ScrollView contentContainerStyle={styles.imageContainer}>
      {tags.map((imageTags, index) => (
        <View key={index}>
          <Text style={{ color: colors.text }}>Image {index + 1}:</Text>
          {imageTags.map((tag, index) => (
            <Text style={{ color: colors.text }} key={index}>
              {tag.tag.en}
            </Text>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
  },
});

export { Tags };
