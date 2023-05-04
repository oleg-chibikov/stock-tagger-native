import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { commonStyles, ContainerStyleProps } from '../Themed';

interface ComboBoxItem<TValue> {
  label: string;
  value: TValue;
}

interface ComboBoxProps<TValue> extends ContainerStyleProps {
  items: ComboBoxItem<TValue>[];
  onSelect: (item: TValue) => void;
  placeholder?: string;
  value?: TValue;
  enableSearch?: boolean;
  editable?: boolean;
  listStyle?: StyleProp<ViewStyle>;
}

const ComboBox = <TValue,>({
  items,
  onSelect,
  placeholder,
  value,
  enableSearch = false,
  editable = true,
  listStyle,
}: ComboBoxProps<TValue>) => {
  const [inputValue, setInputValue] = useState(
    value ? items.find((item) => item.value === value)?.label || '' : ''
  );
  const [showListWithOpacity, setShowListWithOpacity] = useState(false);
  const [showList, setShowList] = useState(false);
  const opacityAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacityAnimation, {
      toValue: showListWithOpacity ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setShowList(showListWithOpacity);
    });
  }, [showListWithOpacity]);

  let timeout: NodeJS.Timeout;

  const handleSelect = (item: ComboBoxItem<TValue>) => {
    setInputValue(item.label);
    clearTimeout(timeout);
    setShowListWithOpacity(false);
    onSelect(item.value);
  };

  const renderItem = ({ item }: { item: ComboBoxItem<TValue> }) => (
    <TouchableHighlight
      onPress={() => (showListWithOpacity ? handleSelect(item) : undefined)}
      style={styles.listItem}
    >
      <Text style={styles.listItemText}>{item.label}</Text>
    </TouchableHighlight>
  );

  const filterData = !enableSearch
    ? items
    : items.filter((item) =>
        item.label.toLowerCase().includes(inputValue.toLowerCase())
      );

  return (
    <View style={styles.container}>
      <TextInput
        style={commonStyles.input}
        onChangeText={(v) => {
          setInputValue(v);
          onSelect(v as TValue); // TValue must be string when ComboBox is editable
        }}
        value={inputValue}
        editable={editable}
        onFocus={() => {
          clearTimeout(timeout);
          setShowListWithOpacity(true);
        }}
        onBlur={() => {
          clearTimeout(timeout);
          timeout = setTimeout(() => setShowListWithOpacity(false), 250);
        }}
        placeholder={placeholder}
      />

      {showList && (
        <Animated.View
          style={[
            styles.list,
            listStyle,
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    maxHeight: 500,
    shadowColor: 'white',
    shadowRadius: 100,
    shadowOpacity: 0.3,
    top: 30,
    position: 'absolute',
  },
  listItem: {
    minHeight: 30,
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

export { ComboBoxProps, ComboBoxItem, ComboBox };
