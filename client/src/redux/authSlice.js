import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthApi from "../apis/authApi";
import { errorHandler } from "../utils/errorHandler";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    userData: user ?? null,
    isLoading: false,
    isSuccess: false,
    hasError: false,
    message: ""
};

export const register = createAsyncThunk("auth/register",
    async (data, thunkAPI) => {
        try {
            const res = await AuthApi.register(data);

            if (res.data)
                localStorage.setItem("user", JSON.stringify(res.data));

            return res.data;
        } catch (err) {
            const message = errorHandler(err);

            return thunkAPI.rejectWithValue(message);
        }
    });


export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
    try {
        const res = await AuthApi.login(data);

        if (res.data)
            localStorage.setItem("user", JSON.stringify(res.data));

        return res.data;
    } catch (err) {
        const message = errorHandler(err);

        return thunkAPI.rejectWithValue(message);
    }
});

export const logout = createAsyncThunk("auth/logout", async () => {
    await localStorage.removeItem("user");
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.hasError = false;
            state.message = "";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.userData = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.hasError = true;
                state.message = action.payload;
                state.userData = null;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.userData = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.hasError = true;
                state.message = action.payload;
                state.userData = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.userData = null;
            });
    }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;

