import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchMarketData = createAsyncThunk(
  "market/fetchMarketData",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1"
      );

      if (!res.ok) {
        throw new Error("Failed to fetch market data");
      }

      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const marketSlice = createSlice({
  name: "market",
  initialState: {
    coins: [],        // ✅ ALWAYS array
    loading: false,
    error: null,
    lastUpdated: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMarketData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMarketData.fulfilled, (state, action) => {
        state.loading = false;
        state.coins = action.payload;
        state.lastUpdated = Date.now();
      })
      .addCase(fetchMarketData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default marketSlice.reducer;
