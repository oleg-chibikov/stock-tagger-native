import React, { FunctionComponent } from 'react';
import { TextInput, View } from 'react-native';
import { commonStyles, ContainerStyleProps, Text } from '../Themed';

interface LabeledInputProps extends ContainerStyleProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  labelWidth?: number | string;
}

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
