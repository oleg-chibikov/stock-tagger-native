import React from 'react';
import { View } from 'react-native';
import { commonStyles, Text } from '../Themed';
import { ComboBox, ComboBoxProps } from './ComboBox';

interface LabeledPickerProps<TValue> extends ComboBoxProps<TValue> {
  label: string;
  onSelect: (value: TValue) => void;
  labelWidth?: number | string;
}

const LabeledPicker = <TValue,>(props: LabeledPickerProps<TValue>) => {
  const { label, style, labelWidth, ...rest } = props;
  return (
    <View style={[commonStyles.inputContainer, style]}>
      <Text style={{ width: labelWidth }}>{label}:</Text>
      <ComboBox<TValue> {...rest} style={commonStyles.input} />
    </View>
  );
};

export { LabeledPicker };
