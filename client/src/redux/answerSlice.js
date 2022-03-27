import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { errorHandler } from "../utils/errorHandler";
import AnswersApi from "../apis/answersApi";

const initialState = {
    answers: [],
    answer: null,
    isLoading: false,
    isSuccess: false,
    hasError: false,
    message: ""
};

export const createAnswer = createAsyncThunk("answers/create",
    async ({ id, answer }, thunkAPI) => {
        try {
            const res = await AnswersApi.createAnswer(id, { text: answer });

            return res.data;
        } catch (err) {
            const message = errorHandler(err);

            return thunkAPI.rejectWithValue(message);
        }
    });

export const getAnswersByQuestionId = createAsyncThunk("answers/getAll",
    async (id, thunkAPI) => {
        try {
            const res = await AnswersApi.getAnswersByQuestionId(id);

            return res.data;
        } catch (err) {
            const message = errorHandler(err);

            return thunkAPI.rejectWithValue(message);
        }
    });

export const getAnswerById = createAsyncThunk("answers/getById",
    async (id, thunkAPI) => {
        try {
            const res = await AnswersApi.getAnswerById(id);

            return res.data;
        } catch (err) {
            const message = errorHandler(err);

            return thunkAPI.rejectWithValue(message);
        }
    });

export const updateAnswer = createAsyncThunk("answers/update",
    async ({ id, answer }, thunkAPI) => {
        try {
            const res = await AnswersApi.updateAnswer(id, { text: answer });

            return res.data;
        } catch (err) {
            const message = errorHandler(err);

            return thunkAPI.rejectWithValue(message);
        }
    });

export const deleteAnswer = createAsyncThunk("answers/delete",
    async (id, thunkAPI) => {
        try {
            const res = await AnswersApi.deleteAnswer(id);

            return res.data;
        } catch (err) {
            const message = errorHandler(err);

            return thunkAPI.rejectWithValue(message);
        }
    });

export const answerSlice = createSlice({
    name: "answer",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createAnswer.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createAnswer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.hasError = false;
                state.answer = action.payload;
                state?.answers.push(action.payload);
            })
            .addCase(createAnswer.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.hasError = true;
                state.message = action.payload;
            })
            .addCase(getAnswersByQuestionId.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAnswersByQuestionId.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.hasError = false;
                state.answers = action.payload;
            })
            .addCase(getAnswersByQuestionId.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.hasError = true;
                state.message = action.payload;
            })
            .addCase(getAnswerById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAnswerById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.hasError = false;
                state.answer =
                    {
                        ...action.payload.answer,
                        ratings: action.payload.ratings
                    };
                state.answers = state.answers.map((answer) => {
                    if (answer.id === action.payload.answer.id)
                        return { ...answer, ratings: action.payload.ratings };

                    return answer;
                });
            })
            .addCase(getAnswerById.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.hasError = true;
                state.message = action.payload;
            })
            .addCase(updateAnswer.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateAnswer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.hasError = false;
                state.message = "";
                state.answers = state.answers.map((answer) => {
                    if (answer.id === action.payload.id)
                        return { ...state.answer, ...action.payload };

                    return answer;
                });
                state.answer = { ...state.answer, ...action.payload };
            })
            .addCase(updateAnswer.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.hasError = true;
                state.message = action.payload;
            })
            .addCase(deleteAnswer.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteAnswer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.answers = state.answers.filter((answer) =>
                    answer.id !== action.payload.answer.id);
                state.message = action.payload;
            })
            .addCase(deleteAnswer.rejected, (state, action) => {
                state.isLoading = false;
                state.hasError = true;
                state.message = action.payload;
            });
    }
});

export const { reset } = answerSlice.actions;

export default answerSlice.reducer;