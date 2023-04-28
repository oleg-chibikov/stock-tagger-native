import axios from 'axios';
import getEnvVars from '../environment';
import { ImageWithData } from '../helpers/fileHelper';

interface Tag {
  confidence: number;
  tag: {
    en: string;
  };
}
const tags = [
  'nature',
  'landscape',
  'cityscape',
  'portrait',
  'wildlife',
  'architecture',
  'food',
  'fashion',
  'travel',
  'sports',
  'abstract',
  'macro',
  'black and white',
  'street',
  'night',
  'beach',
  'sunset',
  'sunrise',
  'mountains',
  'forest',
];
function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function uploadImageAndGetTags(imageData: ImageWithData): Promise<Tag[]> {
  const { imaggaKey, imaggaSecret } = getEnvVars();
  const apiKey = imaggaKey;
  const apiSecret = imaggaSecret;

  const formData = new FormData();
  const base64 = imageData.uri.split(',')[1];
  formData.append('image_base64', base64);

  const response = await axios.post(
    'https://api.imagga.com/v2/tags',
    formData,
    {
      auth: {
        username: apiKey,
        password: apiSecret,
      },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data.result.tags;
  // await delay(1000);
  // shuffleArray(tags);

  // return tags.slice(0, 50).map((tag) => ({
  //   confidence: 1,
  //   tag: {
  //     en: tag,
  //   },
  // }));
}

export { uploadImageAndGetTags };
