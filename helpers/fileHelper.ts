const fileToUri = async (file: File): Promise<string> => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  return await new Promise<string>((resolve) => {
    reader.onloadend = () => resolve(reader.result as string);
  });
};

interface ImageWithData {
  name: string;
  uri: string;
  file: File;
}

export type { ImageWithData };
export { fileToUri };
