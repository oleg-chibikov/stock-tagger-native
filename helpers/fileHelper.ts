const fileToUri = async (file: File): Promise<string> => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  return await new Promise<string>((resolve) => {
    reader.onloadend = () => resolve(reader.result as string);
  });
};

interface ImageWithMetadata {
  name: string;
  uri: string;
}

interface ImageWithData extends ImageWithMetadata {
  file: File;
}

export type { ImageWithData, ImageWithMetadata };
export { fileToUri };
