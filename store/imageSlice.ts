import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ImageWithData, ImageWithMetadata } from '../helpers/fileHelper';

interface ImageState {
  images: ImageWithData[];
  selectedImages: ImageWithMetadata[];
}

const initialState: ImageState = {
  images: [],
  selectedImages: [],
};

const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    setImages: (state, action: PayloadAction<ImageWithData[]>) => {
      state.images = action.payload;
    },
    setSelectedImages: (state, action: PayloadAction<ImageWithMetadata[]>) => {
      state.selectedImages = action.payload;
    },
  },
});

export const { setImages, setSelectedImages } = imageSlice.actions;
export default imageSlice.reducer;
