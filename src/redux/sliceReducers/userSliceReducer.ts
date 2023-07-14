import { auth } from "@/libs/firebase";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

interface IUserType {
    email: string | null,
    password: string | null
}
interface IUserStateType {
    user: IUserType ,
    isLoading?: boolean,
    isError?: boolean,
    error?: string | null
}
const initialState: IUserStateType = {
    user: {
        email: "",
        password: ""
    },
    isLoading: false,
    isError: false,
    error: ""
}

export const userCreate = createAsyncThunk("user/userCreate",
    async ({ email, password }: { email: string, password: string }) => {
        const data = await createUserWithEmailAndPassword(auth, email, password);
        return data.user.email
    }
);

export const loginUser = createAsyncThunk("user/loginUser",
    async ({ email, password }: { email: string, password: string }) => {
        const data = await signInWithEmailAndPassword(auth, email, password)
        return data.user.email
    }
);

const userSliceReducer = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<string | null>) => {
            state.user.email = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(userCreate.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = null;
            })
            .addCase(userCreate.fulfilled, (state, action) => {
                state.user.email = action.payload;
                state.isLoading = false;
            })
            .addCase(userCreate.rejected, (state, action) => {
                state.user.email = null;
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message!;
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user.email = action.payload;
                state.isLoading = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.user.email = null;
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message!;
            });
    },
})


export const { setUser, setLoading } = userSliceReducer.actions;

export default userSliceReducer.reducer