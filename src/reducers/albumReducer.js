import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Constants from "../Constants/Constants";
const initialState = {
  albumData: [],
};

export const getAlbum = createAsyncThunk("fetchAlbum", async () => {
  const albumRes = await axios.get(Constants.ALBUM_BASE_URL);
  const photoRes = await axios.get(Constants.PHOTOS_BASE_URL);

  let jsonResponse = {};
  jsonResponse.albumData = albumRes;
  jsonResponse.photoData = photoRes;

  return jsonResponse;
});

export const randomNumberGenerator = () => {
  return Math.floor(Math.random() * (250 - 50 + 1) + 50);
};

const albumReducer = createSlice({
  name: "albums",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAlbum.fulfilled, (state, action) => {
      let albumData = action.payload.albumData.data;
      let photosData = action.payload.photoData.data;
      let tempArr = [];
      for (let key in albumData) {
        if (key < 5) {
          tempArr.push({ albumData: albumData[key], photosData: [] });
        }
      }

      let tempArrNew = [];

      tempArr.map((_data) => {
        for (let key in photosData) {
          if (tempArrNew.length < 10) {
            tempArrNew.push(photosData[key]);
            tempArrNew[key].amount = Math.floor(
              Math.random() * (250 - 50 + 1) + 50
            );
          }
          _data.photosData = tempArrNew;
        }
        tempArrNew = [];
      });

      //Update global state
      state.albumData = tempArr;
    });
  },
});

export default albumReducer.reducer;
