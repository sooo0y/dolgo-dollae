import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../shared/Api";
import axios from "axios";

const initialState = {
    post:[],
    comment:[],
    isLoading: false,
    error: null,
}

export const _getComments = createAsyncThunk(
  "comment/getComments",
  async (payload, thunkAPI) => {
    try {
      const data = await instance.get(
        `/api/comment/${payload}`
      );
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const _deleteComment = createAsyncThunk(
  "comment/delete",
  async (payload, thunkAPI) => {
    try {
      const data = await instance.delete(
        `api/auth/comment/${payload}`,
        // {
        //   headers: {
        //     Authorization: sessionStorage.getItem("Authorization"),
        //     RefreshToken: sessionStorage.getItem("RefreshToken"),
        //   },
        // }
      );
      window.location.reload()
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const _updateComment = createAsyncThunk(
  "comment/update",
  async (payload, thunkAPI) => {
    try {
      const data = await instance.put(
        `/api/auth/comment/${payload.id}`,
        payload.formData,
        {
          headers: {
            "Content-Type": "multipart/form",

          },
        }
      );
      window.history.go(-1);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const _postComment = createAsyncThunk(
  "comment/post",
  async (payload, thunkAPI) => {
    try {
      const data = await instance.post(
        `/api/auth/comment/${payload.id}`,
        payload.formData,
        {
          headers: {
            "Content-Type": "multipart/form",

          },
        }
      );
      window.history.go(-1);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const commentSlice = createSlice({
    name:"comment",
    initialState,
    reducers:{},
extraReducers:(builder) => {
        builder
            .addCase(_deleteComment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(_deleteComment.fulfilled, (state,action) => {
                state.isLoading = false;
                const deleteState = state.data.findIndex(post => post.id === action.payload)
                state.comment.slice(deleteState,1)
            })
            .addCase(_deleteComment.rejected, (state,action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
        builder
            .addCase(_getComments.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(_getComments.fulfilled, (state,action) => {
                state.isLoading = false;
                state.comment = action.payload;
            })
            .addCase(_getComments.rejected, (state,action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
        builder
            .addCase(_postComment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(_postComment.fulfilled, (state,action) => {
                state.isLoading = true;
                state.comment = action.payload;
            })
            .addCase(_postComment.rejected, (state,action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
        builder
            .addCase(_updateComment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(_updateComment.fulfilled, (state,action) => {
                state.isLoading = true;
                state.comment = action.payload;
            })
            .addCase(_updateComment.rejected, (state,action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
})


export const {} = commentSlice.actions;
export default commentSlice