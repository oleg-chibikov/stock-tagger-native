import React, { FunctionComponent } from 'react';
import { TextInput, View, ViewStyle } from 'react-native';
import { commonStyles, Text } from '../Themed';

type LabeledInputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  containerStyle?: ViewStyle;
  labelWidth?: number | string;
};

const LabeledInput: FunctionComponent<LabeledInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  containerStyle,
  labelWidth,
}) => {
  return (
    <View style={[commonStyles.inputContainer, containerStyle]}>
      <Text style={{ width: labelWidth }}>{label}:</Text>
      <TextInput
        style={commonStyles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
    </View>
  );
};

export { LabeledInput };
