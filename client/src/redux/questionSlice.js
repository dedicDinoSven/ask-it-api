import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import QuestionsApi from "../apis/questionsApi";
import { errorHandler } from "../utils/errorHandler";

const initialState = {
    questions: [],
    recentQuestions: [],
    mostLikedQuestions: [],
    question: null,
    isLoading: false,
    isSuccess: false,
    hasError: false,
    message: ""
};

export const createQuestion = createAsyncThunk("questions/create",
    async (data, thunkAPI) => {
        try {
            const res = await QuestionsApi.createQuestion(data);

            return res.data;
        } catch (err) {
            const message = errorHandler(err);

            return thunkAPI.rejectWithValue(message);
        }
    });

export const getQuestions = createAsyncThunk("questions/getAll",
    async (queryParams, thunkAPI) => {
        try {
            const res = await QuestionsApi.getQuestions(queryParams?.orderBy,
                queryParams?.sort, queryParams?.limit, queryParams?.offset,
                queryParams?.filters);
            return res.data;
        } catch (err) {
            const message = errorHandler(err);

            return thunkAPI.rejectWithValue(message);
        }
    });

export const getRecentQuestions = createAsyncThunk("questions/getRecent",
    async ({ limit, offset, filters }, thunkAPI) => {
        try {
            const res = await QuestionsApi.getQuestions("createdAt", "DESC",
                limit, offset, filters);

            return res.data;
        } catch (err) {
            const message = errorHandler(err);

            return thunkAPI.rejectWithValue(message);
        }
    });

export const getMostLikedQuestions = createAsyncThunk("questions/geMostLiked",
    async (_, thunkAPI) => {
        try {
            const res = await QuestionsApi.getMostLikedQuestions();

            return res.data;
        } catch (err) {
            const message = errorHandler(err);

            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getQuestionById = createAsyncThunk("questions/getById",
    async (id, thunkAPI) => {
        try {
            const res = await QuestionsApi.getQuestionById(id);

            return res.data;
        } catch (err) {
            const message = errorHandler(err);

            return thunkAPI.rejectWithValue(message);
        }
    });

export const updateQuestion = createAsyncThunk("questions/update",
    async ({ id, data }, thunkAPI) => {
        try {
            const res = await QuestionsApi.updateQuestion(id, data);

            return res.data;
        } catch (err) {
            const message = errorHandler(err);

            return thunkAPI.rejectWithValue(message);
        }
    });

export const deleteQuestion = createAsyncThunk("questions/delete",
    async (id, thunkAPI) => {
        try {
            const res = await QuestionsApi.deleteQuestion(id);

            return res.data;
        } catch (err) {
            const message = errorHandler(err);

            return thunkAPI.rejectWithValue(message);
        }
    });

export const questionSlice = createSlice({
    name: "question",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createQuestion.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createQuestion.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.hasError = false;
                state.question = action.payload;
                state?.questions.push(action.payload);
            })
            .addCase(createQuestion.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.hasError = true;
                state.message = action.payload;
            })
            .addCase(getQuestions.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getQuestions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.hasError = false;
                state.questions = action.payload;
            })
            .addCase(getQuestions.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.hasError = true;
                state.message = action.payload;
            })
            .addCase(getRecentQuestions.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getRecentQuestions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.hasError = false;
                state.recentQuestions = action.payload;
            })
            .addCase(getRecentQuestions.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.hasError = true;
                state.message = action.payload;
            })
            .addCase(getMostLikedQuestions.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMostLikedQuestions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.hasError = false;
                state.mostLikedQuestions = action.payload;
            })
            .addCase(getMostLikedQuestions.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.hasError = true;
                state.message = action.payload;
            })
            .addCase(getQuestionById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getQuestionById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.hasError = false;
                state.question = {
                    ...action.payload.question,
                    ratings: action.payload.ratings
                };
            })
            .addCase(getQuestionById.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.hasError = true;
                state.message = action.payload;
            })
            .addCase(updateQuestion.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateQuestion.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.hasError = false;
                state.message = "";
                state.questions = state.questions.map((question) => {
                    if (question.id === action.payload.id)
                        return { ...state.question, ...action.payload };

                    return question;
                });
                state.question = { ...state.question, ...action.payload };
            })
            .addCase(updateQuestion.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.hasError = true;
                state.message = action.payload;
            })
            .addCase(deleteQuestion.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteQuestion.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.questions = state.questions.filter((question) =>
                    question.id !== action.payload.question.id);
                state.message = action.payload;
            })
            .addCase(deleteQuestion.rejected, (state, action) => {
                state.isLoading = false;
                state.hasError = true;
                state.message = action.payload;
            });
    }
});

export const { reset } = questionSlice.actions;

export default questionSlice.reducer;