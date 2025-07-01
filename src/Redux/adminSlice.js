import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "slice for admin",
  initialState: { admindetails: {} },
  reducers: {
    setName: (state, action) => {
      state.admindetails.username = action.payload;
    },
    setToken: (state, action) => {
      state.admindetails.admin_token = action.payload;
    },
  },
});
export const { setName, setToken } = adminSlice.actions;
export default adminSlice.reducer;
