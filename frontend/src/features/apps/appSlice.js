import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import appService from './appService'

const initialState = {
  apps: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}


// Create new App
export const createApp = createAsyncThunk('apps/create', async (appData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await appService.createApp(appData, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message || error.message || error.toString())
    return thunkAPI.rejectWithValue(message)
  }
})


// Get user apps
export const getApps = createAsyncThunk('apps/getAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await appService.getApps(token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message || error.message || error.toString())
    return thunkAPI.rejectWithValue(message)
  }
})



// Get single apps
export const getSingleApp = createAsyncThunk('apps/getSingleApp', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await appService.getSingleApp(id, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message || error.message || error.toString())
    return thunkAPI.rejectWithValue(message)
  }
})



// Update App
export const updateApp = createAsyncThunk('apps/update', async (appData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await appService.updateApp(appData, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message || error.message || error.toString())
    return thunkAPI.rejectWithValue(message)
  }
})


// Delete App
export const deleteApp = createAsyncThunk('apps/delete', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await appService.deleteApp(id, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message || error.message || error.toString())
    return thunkAPI.rejectWithValue(message)
  }
})


export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createApp.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createApp.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.apps.push(action.payload)
      })
      .addCase(createApp.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getApps.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getApps.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.apps = action.payload
      })
      .addCase(getApps.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getSingleApp.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSingleApp.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.apps = action.payload
      })
      .addCase(getSingleApp.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateApp.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateApp.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.apps = action.payload
      })
      .addCase(updateApp.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteApp.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteApp.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.apps = state.apps.filter((app) => app._id !== action.payload.id)
      })
      .addCase(deleteApp.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})



export const { reset } = appSlice.actions
export default appSlice.reducer