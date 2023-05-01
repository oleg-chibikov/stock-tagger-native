import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import { Text, View } from './Themed';

interface TagsProps {
  tags: string[];
}

const Tags: React.FunctionComponent<TagsProps> = ({ tags }) => {
  const [data, setData] = useState(tags);
  const [newTag, setNewTag] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState<number>();
  const theme = useTheme();

  const renderItem = ({
    item,
    getIndex,
    drag,
    isActive,
  }: RenderItemParams<string>) => {
    const index = getIndex();
    return (
      <TouchableOpacity style={styles.tagContainer} onLongPress={drag}>
        <Text
          style={{
            flex: 1,
            paddingVertical: 5,
            paddingHorizontal: 10,
            backgroundColor: isActive
              ? theme.colors.primary
              : theme.colors.card,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 5,
          }}
        >
          {item}
        </Text>
        <MaterialIcons
          name="cancel"
          size={24}
          color={
            index === hoveredIndex
              ? theme.colors.notification
              : theme.colors.card
          }
          onPress={() => handleRemoveTag(index)}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(undefined)}
        />
      </TouchableOpacity>
    );
  };

  const handleAddTag = () => {
    if (newTag) {
      setData((prevData) => [newTag, ...prevData]);
      setNewTag('');
    }
  };
  const handleRemoveTag = (index?: number) => {
    if (index !== undefined) {
      setData((prevData) => prevData.filter((_, i) => i !== index));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newTag}
          onChangeText={setNewTag}
          placeholder="Enter new tag"
        />
        <Text style={styles.addButton} onPress={handleAddTag}>
          Add
        </Text>
      </View>
      <DraggableFlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => `draggable-item-${item}`}
        onDragEnd={({ data }) => setData(data)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
    color: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
  },
  addButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  tagContainer: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export { Tags };
