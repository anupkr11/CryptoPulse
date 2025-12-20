import { useDispatch, useSelector } from "react-redux";
import {
  setBaseCurrency,
  setSearchQuery,
  setSelectedCoin,
} from "../redux/slices/uiSlice";
import { useState } from "react";

const TopControlsCard = () => {
  const dispatch = useDispatch();

  const baseCurrency = useSelector(
    (state) => state.ui.baseCurrency
  );
  const { coins } = useSelector(
    (state) => state.market
  );

  const searchQuery = useSelector(
    (state) => state.ui.searchQuery
  );

  const [openCurrency, setOpenCurrency] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  const filteredCoins =
    searchQuery.length > 0
      ? coins.filter((coin) =>
          coin.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : [];

  const handleCoinSelect = (coin) => {
    dispatch(setSelectedCoin(coin));
    dispatch(setSearchQuery(""));
    setOpenSearch(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex items-center gap-4">
      
      {/* Currency Dropdown */}
      <div className="relative">
        <button
          onClick={() => setOpenCurrency(!openCurrency)}
          className="flex items-center justify-between gap-2 px-4 py-2 border border-blue-500 rounded-lg text-sm font-medium w-24"
        >
          {baseCurrency.toUpperCase()}
          ▼
        </button>

        {openCurrency && (
          <div className="absolute mt-2 w-24 bg-white border rounded-lg shadow-lg z-10">
            <div
              onClick={() => dispatch(setBaseCurrency("usd"))}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              USD
            </div>
            <div
              onClick={() => dispatch(setBaseCurrency("inr"))}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              INR
            </div>
          </div>
        )}
      </div>

      {/* Search */}
      <div className="flex-1 relative">
        <input
          value={searchQuery}
          onChange={(e) => {
            dispatch(setSearchQuery(e.target.value));
            setOpenSearch(true);
          }}
          placeholder="Search by coin"
          className="w-full pl-4 pr-4 py-2 rounded-lg bg-gray-100"
        />

        {/* Search Result Dropdown */}
        {openSearch && filteredCoins.length > 0 && (
          <div className="absolute top-11 left-0 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto z-20">
            {filteredCoins.map((coin) => (
              <div
                key={coin.id}
                onClick={() => handleCoinSelect(coin)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              >
                {coin.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopControlsCard;
