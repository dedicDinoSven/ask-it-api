import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { errorHandler } from "../utils/errorHandler";
import UsersApi from "../apis/usersApi";

const initialState = {
    users: [],
    user: null,
    isLoading: false,
    isSuccess: false,
    hasError: false,
    message: ""
};

export const getUsers = createAsyncThunk("users/getAll",
    async (_, thunkAPI) => {
        try {
            const res = await UsersApi.getUsers();

            return res.data;
        } catch (err) {
            const message = errorHandler(err);

            return thunkAPI.rejectWithValue(message);
        }
    });

export const getUserById = createAsyncThunk("users/getById",
    async (id, thunkAPI) => {
        try {
            const res = await UsersApi.getUserById(id);

            return res.data;
        } catch (err) {
            const message = errorHandler(err);

            return thunkAPI.rejectWithValue(message);
        }
    });

export const updateUser = createAsyncThunk("users/update",
    async ({ id, data }, thunkAPI) => {
        try {
            const res = await UsersApi.updateUser(id, data);

            return res.data;
        } catch (err) {
            const message = errorHandler(err);

            return thunkAPI.rejectWithValue(message);
        }
    });


export const updatePassword = createAsyncThunk("users/update-password",
    async ({ id, data }, thunkAPI) => {
        try {
            console.log(data);
            const res = await UsersApi.updatePassword(id, data);

            return res.data;
        } catch (err) {
            const message = errorHandler(err);

            return thunkAPI.rejectWithValue(message);
        }
    });


export const deleteUser = createAsyncThunk("users/delete",
    async (id, thunkAPI) => {
        try {
            const res = await UsersApi.deleteUser(id);

            return res.data;
        } catch (err) {
            const message = errorHandler(err);

            return thunkAPI.rejectWithValue(message);
        }
    });

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.hasError = false;
                state.users = action.payload;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.hasError = true;
                state.message = action.payload;
            })
            .addCase(getUserById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.hasError = false;
                state.user = action.payload;
            })
            .addCase(getUserById.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.hasError = true;
                state.message = action.payload;
            })
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.hasError = false;
                state.users = state.users.map((user) => {
                    if (user.id === action.payload.id)
                        return { ...state.user, ...action.payload };

                    return user;
                });
                state.user = { ...state.user, ...action.payload };
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.hasError = true;
                state.message = action.payload;
            })
            .addCase(updatePassword.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updatePassword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.hasError = false;
                state.message = action.payload;
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.hasError = true;
                state.message = action.payload;
            })
            .addCase(deleteUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.users =
                    state.users.filter(
                        (user) => user.id !== action.payload.user.id);
                state.message = action.payload;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.isLoading = false;
                state.hasError = true;
                state.message = action.payload;
            });
    }
});

export const { reset } = userSlice.actions;

export default userSlice.reducer;