/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
  StyleProp,
  StyleSheet,
  Text as DefaultText,
  useColorScheme,
  View as DefaultView,
  ViewStyle,
} from 'react-native';

import Colors from '../constants/Colors';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

const commonStyles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
    color: '#ccc',
    backgroundColor: 'black',
    borderRadius: 0,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

// export function View(props: ViewProps) {
//   const { style, lightColor, darkColor, ...otherProps } = props;
//   const backgroundColor = useThemeColor(
//     { light: lightColor, dark: darkColor },
//     'background'
//   );

//   return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
// }

interface ContainerStyleProps {
  style?: StyleProp<ViewStyle>;
}

export { ContainerStyleProps, commonStyles };
