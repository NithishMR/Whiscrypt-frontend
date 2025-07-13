import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: { admindetails: { role: "admin" } },
  reducers: {
    setAdminName: (state, action) => {
      state.admindetails.username = action.payload;
    },
    setAdminToken: (state, action) => {
      state.admindetails.admin_token = action.payload;
    },
  },
});
export const { setAdminName, setAdminToken } = adminSlice.actions;
export default adminSlice.reducer;
