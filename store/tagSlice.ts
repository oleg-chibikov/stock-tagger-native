import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TagState {
  tags: string[];
  selectedTags: string[];
}

const initialState: TagState = {
  tags: [],
  selectedTags: [],
};

const tagSlice = createSlice({
  name: 'tag',
  initialState,
  reducers: {
    setTags: (state, action: PayloadAction<string[]>) => {
      state.tags = action.payload;
    },
    removeTagAtIndex: (state, action: PayloadAction<number>) => {
      state.tags = state.tags.filter((_, i) => i !== action.payload);
    },
    prependTag: (state, action: PayloadAction<string>) => {
      state.tags.unshift(action.payload);
    },
    setSelectedTags: (state, action: PayloadAction<string[]>) => {
      state.selectedTags = action.payload;
    },
  },
});

export const { setTags, removeTagAtIndex, prependTag, setSelectedTags } =
  tagSlice.actions;
export default tagSlice.reducer;
