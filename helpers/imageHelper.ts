import * as DocumentPicker from 'expo-document-picker';
import { fileToUri, ImageWithData } from '../helpers/fileHelper';

const getImageData = async (file: File): Promise<ImageWithData> => {
  const uri = await fileToUri(file);
  return { name: file.name, uri: uri, file: file };
};

const pickImages = async (): Promise<ImageWithData[] | null> => {
  const result = await DocumentPicker.getDocumentAsync({
    type: 'image/*',
    multiple: true,
    copyToCacheDirectory: true,
  });

  if (result.type !== 'cancel') {
    if (result.output) {
      return await Promise.all(Array.from(result.output).map(getImageData));
    }
    return result.file ? [await getImageData(result.file)] : null;
  }

  return null;
};

export { pickImages };
