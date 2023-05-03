import React from 'react';
import { View } from 'react-native';
import { commonStyles, ContainerStyleProps, Text } from '../Themed';
import { ComboBox, ComboBoxItem } from './ComboBox';

interface LabeledPickerProps<TValue> extends ContainerStyleProps {
  label: string;
  value?: TValue;
  onSelect: (value: TValue) => void;
  items: ComboBoxItem<TValue>[];
  labelWidth?: number | string;
}

const LabeledPicker = <TValue,>({
  label,
  value,
  onSelect,
  items,
  containerStyle,
  labelWidth,
}: LabeledPickerProps<TValue>) => {
  return (
    <View style={[commonStyles.inputContainer, containerStyle]}>
      <Text style={{ width: labelWidth }}>{label}:</Text>
      <ComboBox<TValue>
        containerStyle={commonStyles.input}
        initialValue={value}
        onSelect={onSelect}
        data={items}
      />
    </View>
  );
};

export { LabeledPicker };
