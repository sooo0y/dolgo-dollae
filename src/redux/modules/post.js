import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { instance } from "../../shared/Api";

const initialState = {
    post: [],
    detail:{},
    isLoading: false,
    error: null,
}

export const _getDetail = createAsyncThunk(
  "post/getDetail",
  async (payload, thunkAPI) => {
    try {
      const data = await instance.get(
        `/api/place/${payload}`,
      );
      console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const onLikeDetail = createAsyncThunk(
  "like/onLikePost",
  async (payload, thunkAPI) => {
    try {
      const data = await instance.post(
        `/api/auth/place/like/${payload}`,
        {},
      );
      // window.location.reload()
      return payload;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const onLikeGet = createAsyncThunk(
  "like/onLikeGet",
  async (payload, thunkAPI) => {
    console.log(payload)
    try {
      setTimeout( async() => {
        const data = await instance.get(
          `/api/place/like/${payload.id}`,
          {},
        );
        return thunkAPI.fulfillWithValue(data.data);
      },500)

      // window.location.reload()

    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const postSlice = createSlice({
    name:"post",
    initialState,
    reducers:{},
extraReducers:(builder) => {
        builder
            .addCase(_getDetail.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(_getDetail.fulfilled, (state,action) => {
                state.isLoading = false;
                state.detail = action.payload;
                console.log(state.detail)
            })
            .addCase(_getDetail.rejected, (state,action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
        builder
            .addCase(onLikeGet.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(onLikeGet.fulfilled, (state,action) => {
                state.isLoading = false;
                state.detail = action.payload;
                console.log(state.detail)
            })
            .addCase(onLikeGet.rejected, (state,action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
        builder
            .addCase(onLikeDetail.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(onLikeDetail.fulfilled, (state,action) => {
                state.isLoading = false;
                state.detail = action.payload;
                console.log(action)
            })
            .addCase(onLikeDetail.rejected, (state,action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
})

export const {} = postSlice.actions;
export default postSlice