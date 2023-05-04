import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store/store';
import { removeTagAtIndex, setTags } from '../../store/tagSlice';
import { ContainerStyleProps, Text } from '../Themed';
import { Tag } from './Tag';

const Tags: React.FunctionComponent<ContainerStyleProps> = ({ style }) => {
  const tags = useAppSelector((state) => state.tag.tags);
  const dispatch = useDispatch();

  const [hoveredIndex, setHoveredIndex] = useState<number>();

  const renderItem = (props: RenderItemParams<string>) => (
    <Tag
      {...props}
      handleRemoveTag={handleRemoveTag}
      setHoveredIndex={setHoveredIndex}
      hoveredIndex={hoveredIndex}
    />
  );

  const handleRemoveTag = (index?: number) => {
    if (index !== undefined) {
      dispatch(removeTagAtIndex(index));
    }
  };

  const handleSetTags = (tags: string[]) => {
    dispatch(setTags(tags));
  };

  return (
    <View style={[style, styles.container]}>
      {Boolean(tags.length) && (
        <>
          <Text style={styles.title}>Tags</Text>
          <ScrollView style={styles.scrollView}>
            <DraggableFlatList
              data={tags}
              renderItem={renderItem}
              keyExtractor={(item) => `draggable-item-${item}`}
              onDragEnd={({ data }) => handleSetTags(data)}
            />
          </ScrollView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addButtonContainer: { flexDirection: 'row', alignItems: 'center' },
  addButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollView: { flex: 1, maxHeight: 300, marginVertical: 10, paddingRight: 20 },
});

export { Tags };
