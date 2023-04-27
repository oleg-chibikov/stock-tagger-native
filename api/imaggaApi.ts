import { ImagePickerAsset } from 'expo-image-picker';

interface Tag {
  confidence: number;
  tag: {
    en: string;
  };
}

async function uploadImageAndGetTags(image: ImagePickerAsset): Promise<Tag[]> {
  // const { imaggaKey, imaggaSecret } = getEnvVars();
  // const apiKey = imaggaKey;
  // const apiSecret = imaggaSecret;

  // const formData = new FormData();
  // formData.append('image_base64', image.base64!);

  // const response = await axios.post('https://api.imagga.com/v2/tags', formData, {
  //   auth: {
  //     username: apiKey,
  //     password: apiSecret,
  //   },
  //   headers: {
  //     'Content-Type': 'multipart/form-data',
  //   },
  // });

  // return response.data.result.tags;
  return new Array(50).fill({
    confidence: 1,
    tag: {
      en: 'stub',
    },
  });
}

export { uploadImageAndGetTags };
