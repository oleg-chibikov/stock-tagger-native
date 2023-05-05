import { FunctionComponent } from 'react';
import { View } from 'react-native';
import * as Progress from 'react-native-progress';
import { UploadOperation } from '../api/backendApi';
import { Text } from './Themed';

interface ProgressLoadersProps {
  uploadProgress: Record<string, ProgressState>;
}

interface ProgressState {
  progress: number;
  operation: UploadOperation;
}

const operationToString = (operation: UploadOperation) => {
  switch (operation) {
    case UploadOperation.Upscale:
      return 'Upscale';
    case UploadOperation.FtpUpload:
      return 'FTP Upload';
    default:
      return 'Initialising';
  }
};

const ProgressLoader: FunctionComponent<ProgressLoadersProps> = ({
  uploadProgress,
}) => {
  return (
    <>
      {Object.keys(uploadProgress).map((imageName) => {
        const { progress, operation } = uploadProgress[imageName];
        return (
          <View key={imageName} style={{ margin: 10 }}>
            <Text>{imageName}</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 8,
              }}
            >
              <Progress.Bar progress={progress} style={{ marginRight: 8 }} />
              <Text>{operationToString(operation)}</Text>
            </View>
          </View>
        );
      })}
    </>
  );
};

export type { ProgressState };
export { ProgressLoader };
