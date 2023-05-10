import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCocktails = createAsyncThunk(
  "cocktail/fetchCocktail",
  async () => {
    const response = await axios.get(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`
    );
    const { drinks } = response?.data;
    return drinks;
  }
);

export const fetchSingleCocktail = createAsyncThunk(
  "cocktail/fetchsingleCocktail",
  async ({ id }) => {
    const res = await axios.get(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const { drinks } = res?.data;
    return drinks;
  }
);

export const fetchSearchCocktail = createAsyncThunk(
  "cocktail/fetchsearchCocktail",
  async ({ search }) => {
    const res = await axios.get(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`
    );
    const { drinks } = res?.data;
    return drinks;
  }
);

const cocktailSlice = createSlice({
  name: "cocktail",
  initialState: { cocktails: [], status: "idle", error: null, cocktail: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCocktails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCocktails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cocktails = action.payload;
      })
      .addCase(fetchCocktails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // single
      .addCase(fetchSingleCocktail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSingleCocktail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cocktail = action.payload;
      })
      .addCase(fetchSingleCocktail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // search karva mate main cocktails na array ma j data enter karavvana
      .addCase(fetchSearchCocktail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSearchCocktail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cocktails = action.payload;
      })
      .addCase(fetchSearchCocktail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default cocktailSlice.reducer;
