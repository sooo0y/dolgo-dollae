import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../shared/Api";

const initialState = {
    cose:[],
    isLoading: false,
    error: null,
}

export const _deleteCose = createAsyncThunk(
    "cose/delete",
      async (payload, thunkAPI) => {
        try {
          const data = await instance.delete(
            `api/auth/course/${payload}`,
          );
          window.location.reload()
          return thunkAPI.fulfillWithValue(data.data);
        } catch (error) {
          return thunkAPI.rejectWithValue(error);
      }
    }
  );

  export const _updateCose = createAsyncThunk(
    "cose/update",
      async (payload, thunkAPI) => {
        try {
          const data = await instance.put(
            `api/auth/course/${payload.id}`,
            payload.pay,
          );
          window.location.replace('/cose/detail/'+payload.id);
          return thunkAPI.fulfillWithValue(data.data);
        } catch (error) {
          return thunkAPI.rejectWithValue(error);
      }
    }
  );
  export const _ReviseCose = createAsyncThunk(
    "cose/revise",
      async (payload, thunkAPI) => {
        try {
          const data = await instance.put(
            `api/auth/course/${payload.id}`,
            payload.pay,
          )
          return thunkAPI.fulfillWithValue(data.data);
        } catch (error) {
          return thunkAPI.rejectWithValue(error);
      }
    }
  );
  export const _reviseDeleteCose = createAsyncThunk(
    "cose/reviseDelete",
      async (payload, thunkAPI) => {
        try {
          const data = await instance.put(
            `api/auth/course/${payload.id}`,
            payload.pay,
          )
          return thunkAPI.fulfillWithValue(data.data)
        } catch (error) {
          return thunkAPI.rejectWithValue(error);
      }
    }
  );
export const coseSlice = createSlice({
    name:"cose",
    initialState,
    reducers:{},
extraReducers:(builder) => {
        builder
            .addCase(_deleteCose.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(_deleteCose.fulfilled, (state,action) => {
                state.isLoading = false;
                const deleteState = state.data.findIndex(post => post.id === action.payload)
                state.comment.slice(deleteState,1)
            })
            .addCase(_deleteCose.rejected, (state,action) => {
                state.isLoading = false;
                state.error = action.payload;
            })  
        builder
            .addCase(_updateCose.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(_updateCose.fulfilled, (state,action) => {
                state.isLoading = true;
                state.comment = action.payload;
            })
            .addCase(_updateCose.rejected, (state,action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
        builder
            .addCase(_ReviseCose.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(_ReviseCose.fulfilled, (state,action) => {
                state.isLoading = false;
                state.comment = action.payload;
            })
            .addCase(_ReviseCose.rejected, (state,action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
        builder
            .addCase(_reviseDeleteCose.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(_reviseDeleteCose.fulfilled, (state,action) => {
                state.isLoading = false;
                state.comment = action.payload;
            })
            .addCase(_reviseDeleteCose.rejected, (state,action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
})


export const {} = coseSlice.actions;
export default coseSlice