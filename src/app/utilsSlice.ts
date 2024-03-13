import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface StateTypes {
  clicked: boolean;
  searchQuery: string;
}
const initialState: StateTypes = {
  clicked: false,
  searchQuery: "",
};
export const utilsSlice = createSlice({
  name: "utils",
  initialState,
  reducers: {
    clickButton: (state) => {
      state.clicked = !state.clicked;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});
export const { clickButton, setSearchQuery } = utilsSlice.actions;
export default utilsSlice.reducer;
