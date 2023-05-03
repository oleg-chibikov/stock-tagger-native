import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';
import { FunctionComponent } from 'react';
import { Popable } from 'react-native-popable';

const HelpIcon: FunctionComponent = () => {
  const theme = useTheme();
  return (
    <Popable
      wrapperStyle={{ alignSelf: 'center' }}
      action="hover"
      content={`Select the images for which you'd like to get the tags.

        Tags will be downloaded as a CSV file and you'll need to upload them to Adobe stock manually.

        Tags will be applied to all the images regardless of the selection and will be submitted to the stock.

        Without the selection only the first image will be used for tag retrieval.
        `}
      position="bottom"
      style={{ width: 500 }}
    >
      <Ionicons
        name="information-circle-outline"
        size={50}
        color={theme.colors.primary}
      />
    </Popable>
  );
};

export { HelpIcon };
