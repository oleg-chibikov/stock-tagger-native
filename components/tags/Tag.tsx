import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React, { FunctionComponent } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { RenderItemParams } from 'react-native-draggable-flatlist';
import { Text } from '../Themed';

type TagProps = RenderItemParams<string> & {
  handleRemoveTag: (index?: number) => void;
  setHoveredIndex: (value: React.SetStateAction<number | undefined>) => void;
  hoveredIndex: number | undefined;
};

const Tag: FunctionComponent<TagProps> = ({
  item,
  getIndex,
  drag,
  isActive,
  handleRemoveTag,
  setHoveredIndex,
  hoveredIndex,
}) => {
  const index = getIndex();
  const theme = useTheme();
  return (
    <TouchableOpacity style={styles.tagContainer} onLongPress={drag}>
      <Text
        style={{
          flex: 1,
          paddingVertical: 5,
          paddingHorizontal: 10,
          backgroundColor: isActive ? theme.colors.primary : theme.colors.card,
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
          index === hoveredIndex ? theme.colors.notification : theme.colors.card
        }
        onPress={() => handleRemoveTag(index)}
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(undefined)}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tagContainer: {
    marginVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export { Tag };
