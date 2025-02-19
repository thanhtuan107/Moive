import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./../../../services/api";

export const fetchListMovie = createAsyncThunk(
  "dashboardPage/fetchListMovie",
  async (__dirname, { rejectWithValue }) => {
    try {
      const result = await api.get("/QuanLyPhim/LayDanhSachPhim?maNhom=GP01");
        console.log("API data result: ", result);
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const dashboardPageSlice = createSlice({
  name: "dashboardPageSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchListMovie.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchListMovie.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchListMovie.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default dashboardPageSlice.reducer;
