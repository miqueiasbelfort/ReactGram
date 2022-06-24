import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import photoService from "../services/photoService";

const initialState = {
  photos: [],
  photo: {},
  error: false,
  success: false,
  loading: false,
  message: null,
};

// Publish the photo
export const publishPhoto = createAsyncThunk(
  "photo/publish",
  async (photo, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await photoService.publishPhoto(photo, token);

    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

// Get user photos
export const getUserPhotos = createAsyncThunk(
  "photo/userPhotos",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await photoService.getUserPhotos(id, token);
    return data
  }
)

export const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    resetMessagePhoto: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(publishPhoto.pending, (state) => {
        (state.loading = true), (state.error = false);
      })
      .addCase(publishPhoto.fulfilled, (state, action) => {
          (state.loading = false),
          (state.success = true),
          (state.error = null),
          (state.photo = action.payload),
          state.photos.unshift(state.photo),
          (state.message = "Postado com sucesso!");
      })
      .addCase(publishPhoto.rejected, (state, action) => {
          (state.loading = false),
          (state.error = action.payload),
          (state.photo = {});
      })
      .addCase(getUserPhotos.pending, (state) => {
        (state.loading = true), (state.error = false);
      })
      .addCase(getUserPhotos.fulfilled, (state, action) => {
          (state.loading = false),
          (state.success = true),
          (state.error = null),
          (state.photos = action.payload)
      })
  },
});

export const { resetMessagePhoto } = photoSlice.actions;
export default photoSlice.reducer;
