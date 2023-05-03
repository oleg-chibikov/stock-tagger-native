import React, { FunctionComponent, useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { commonStyles } from './Themed';

interface NewTagProps {
  onNewTag: (tag: string) => void;
}

const NewTag: FunctionComponent<NewTagProps> = ({ onNewTag }) => {
  const [newTag, setNewTag] = useState('');
  const handleAddTag = () => {
    if (newTag) {
      onNewTag(newTag.trim());
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
        disabled={!newTag.trim().length}
        onPress={handleAddTag}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center' },
});

export { NewTag };
