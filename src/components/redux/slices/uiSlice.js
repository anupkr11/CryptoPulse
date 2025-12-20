import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    baseCurrency: "usd",
    searchQuery: "",
    selectedCoin: null,
    selectedCoins: ["bitcoin"],
    chartRange: "7",
    chartType: "line",
  },
  reducers: {
    setBaseCurrency: (state, action) => {
      state.baseCurrency = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSelectedCoin: (state, action) => {
      state.selectedCoin = action.payload;
    },
    setSelectedCoins: (state, action) => {
      state.selectedCoins = action.payload;
    },
    setChartRange: (state, action) => {
      state.chartRange = action.payload;
    },
    setChartType: (state, action) => {
      state.chartType = action.payload;
    },
  },
});

/**
 * ✅ THIS EXPORT IS REQUIRED
 */
export const {
  setBaseCurrency,
  setSearchQuery,
  setSelectedCoin,
  setSelectedCoins,
  setChartRange,
  setChartType,
} = uiSlice.actions;

export default uiSlice.reducer;
