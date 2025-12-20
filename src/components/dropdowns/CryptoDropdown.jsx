import { useDispatch, useSelector } from "react-redux";
import { setSelectedCoins } from "../redux/slices/uiSlice";
import { useState } from "react";

const CryptoDropdown = () => {
  const dispatch = useDispatch();
  const coins = useSelector((state) => state.market.coins);
  const selectedCoins = useSelector(
    (state) => state.ui.selectedCoins
  );

  const [open, setOpen] = useState(false);

  const toggleCoin = (coinId) => {
    if (selectedCoins.includes(coinId)) {
      dispatch(
        setSelectedCoins(
          selectedCoins.filter((id) => id !== coinId)
        )
      );
    } else {
      dispatch(setSelectedCoins([...selectedCoins, coinId]));
    }
  };

  return (
    <div className="relative w-56">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-4 py-3 bg-white border rounded-xl shadow-sm text-sm font-medium"
      >
        Cryptocurrency
        <span>▼</span>
      </button>

      {open && (
        <div className="absolute mt-2 w-full bg-white rounded-xl shadow-lg border max-h-60 overflow-y-auto z-20">
          {coins.map((coin) => (
            <div
              key={coin.id}
              onClick={() => toggleCoin(coin.id)}
              className={`px-4 py-3 cursor-pointer text-sm ${
                selectedCoins.includes(coin.id)
                  ? "bg-red-50 font-medium"
                  : "hover:bg-gray-100"
              }`}
            >
              {coin.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CryptoDropdown;
