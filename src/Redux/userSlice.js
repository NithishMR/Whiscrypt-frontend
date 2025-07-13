import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { userdetails: { role: "user" } },
  reducers: {
    setUserName: (state, action) => {
      state.userdetails.username = action.payload;
    },
    setUserToken: (state, action) => {
      state.userdetails.user_token = action.payload;
    },
  },
});
export const { setUserName, setUserToken } = userSlice.actions;
export default userSlice.reducer;
