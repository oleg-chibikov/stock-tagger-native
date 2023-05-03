import { Picker } from '@react-native-picker/picker';
import React, { FunctionComponent } from 'react';
import { View, ViewStyle } from 'react-native';
import { commonStyles, Text } from '../Themed';

type LabeledPickerProps = {
  label: string;
  value?: string | number;
  onValueChange: (value: string | number) => void;
  items: { label: string; value?: string | number }[];
  containerStyle?: ViewStyle;
  labelWidth?: number | string;
};

const LabeledPicker: FunctionComponent<LabeledPickerProps> = ({
  label,
  value,
  onValueChange,
  items,
  containerStyle,
  labelWidth,
}) => {
  return (
    <View style={[commonStyles.inputContainer, containerStyle]}>
      <Text style={{ width: labelWidth }}>{label}:</Text>
      <Picker
        style={commonStyles.input}
        selectedValue={value}
        onValueChange={onValueChange}
      >
        {items.map((item) => (
          <Picker.Item
            key={item.value || 'no key'}
            label={item.label}
            value={item.value}
          />
        ))}
      </Picker>
    </View>
  );
};

export { LabeledPicker };
