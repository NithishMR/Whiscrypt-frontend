import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "slice for user",
  initialState: { userdetails: {} },
  reducers: {
    setName: (state, action) => {
      state.userdetails.username = action.payload;
    },
    setToken: (state, action) => {
      state.userdetails.user_token = action.payload;
    },
  },
});
export const { setName, setToken } = userSlice.actions;
export default userSlice.reducer;
