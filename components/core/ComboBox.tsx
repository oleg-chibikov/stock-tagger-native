import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { commonStyles, ContainerStyleProps } from '../Themed';

interface ComboBoxItem<TValue> {
  label: string;
  value: TValue;
}

interface ComboBoxProps<TValue> extends ContainerStyleProps {
  data: ComboBoxItem<TValue>[];
  onSelect: (item: TValue) => void;
  placeholder?: string;
  initialValue?: TValue;
  enableSearch?: boolean;
}

const ComboBox = <TValue,>({
  data,
  onSelect,
  placeholder,
  initialValue,
  enableSearch = false,
}: ComboBoxProps<TValue>) => {
  const [inputValue, setInputValue] = useState(
    initialValue
      ? data.find((item) => item.value === initialValue)?.label || ''
      : ''
  );
  const [showList, setShowList] = useState(false);
  const opacityAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacityAnimation, {
      toValue: showList ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [showList]);

  const handleSelect = (item: ComboBoxItem<TValue>) => {
    setInputValue(item.label);
    setShowList(false);
    onSelect(item.value);
  };

  const renderItem = ({ item }: { item: ComboBoxItem<TValue> }) => (
    <TouchableOpacity
      onPress={() => (showList ? handleSelect(item) : undefined)}
      style={styles.listItem}
    >
      <Text style={styles.listItemText}>{item.label}</Text>
    </TouchableOpacity>
  );

  const filterData = !enableSearch
    ? data
    : data.filter((item) =>
        item.label.toLowerCase().includes(inputValue.toLowerCase())
      );

  return (
    <View style={styles.container}>
      <TextInput
        style={commonStyles.input}
        onChangeText={setInputValue}
        value={inputValue}
        onFocus={() => setShowList(true)}
        onBlur={() => () => setShowList(false)}
        placeholder={placeholder}
      />

      <Animated.View
        style={[
          styles.list,
          {
            opacity: opacityAnimation,
          },
        ]}
      >
        <FlatList
          data={filterData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  list: {
    maxHeight: 200,
    borderColor: 'gray',
    borderWidth: 1,
    position: 'absolute',
    top: 30,
  },
  listItem: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#222',
    borderColor: '#555',
    borderWidth: 1,
  },
  listItemText: {
    fontSize: 16,
    color: 'white',
  },
});

export { ComboBoxItem, ComboBox };
