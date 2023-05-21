import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ArticleTypes } from "../../types/ArticleTypes";
import { getArticles } from "../../api/article/article";

type ArticleState = {
  articles: ArticleTypes[];
  isLoading: boolean;
  totalArticlesCount: number;
  page: number;
  error: string | null;
};

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  getArticles
);



const articleSlice = createSlice({
  name: "articles",
  initialState: {
    articles: [],
    isLoading: false,
    totalArticlesCount: 0,
    page: 1,
    error: null,
  } as ArticleState,
  reducers: {
    setNextPage(state, action) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.articles = action.payload.articles;
        state.totalArticlesCount = action.payload.articlesCount;
        state.isLoading = false;
      })
      .addCase(fetchArticles.rejected, (state) => {
        state.error = "cant fetch it";
      })
  },
});

export const { setNextPage } = articleSlice.actions;
export default articleSlice.reducer;
