import {configureStore} from '@reduxjs/toolkit'   
import userSliceReducer from './sliceReducers/userSliceReducer';
import { api } from './api/apiSlice';

const store = configureStore({
reducer: { 
    user: userSliceReducer,
    [api.reducerPath] : api.reducer
},
middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store