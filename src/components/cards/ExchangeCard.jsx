import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const ExchangeCard = () => {
  const { coins, loading, error } = useSelector(
    (state) => state.market
  );

  const [sell, setSell] = useState(null);
  const [buy, setBuy] = useState(null);
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState("");
  const [inputError, setInputError] = useState("");

  // Initialize default coins AFTER data arrives
  useEffect(() => {
    if (coins && coins.length >= 2) {
      setSell(coins[0]);
      setBuy(coins[1]);
    }
  }, [coins]);

  const handleAmountChange = (e) => {
    const value = e.target.value;

    if (!/^\d*\.?\d*$/.test(value)) {
      setInputError("Only numeric values allowed");
      return;
    }

    setInputError("");
    setAmount(value);
  };

  const handleExchange = () => {
    if (!amount || !sell || !buy) {
      setInputError("Please enter amount and select coins");
      return;
    }

    const converted =
      (parseFloat(amount) * sell.current_price) /
      buy.current_price;

    setResult(converted.toFixed(6));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!coins || coins.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-md p-8">
      {/* Header */}
      <div className="flex justify-between mb-8">
        <h3 className="text-2xl font-semibold">Exchange Coins</h3>
      </div>

      {/* Sell */}
      <div className="flex items-center gap-4 mb-6">
        <span className="text-orange-500 w-12 font-medium">Sell</span>

        <select
          value={sell?.id}
          onChange={(e) =>
            setSell(coins.find(c => c.id === e.target.value))
          }
          className="bg-gray-100 px-6 py-3 rounded-xl w-48"
        >
          {coins.map((coin) => (
            <option key={coin.id} value={coin.id}>
              {coin.name}
            </option>
          ))}
        </select>

        <input
          value={amount}
          onChange={handleAmountChange}
          placeholder="Enter value"
          className="border px-6 py-3 rounded-xl w-40 "
        />
      </div>

      <div className="flex items-center gap-4 mb-8">
        <span className="text-green-500 w-6 font-medium">Buy</span>

        <select
          value={buy?.id}
          onChange={(e) =>
            setBuy(coins.find(c => c.id === e.target.value))
          }
          className="bg-gray-100 px-6 py-3 rounded-xl w-48"
        >
          {coins.map((coin) => (
            <option key={coin.id} value={coin.id}>
              {coin.name}
            </option>
          ))}
        </select>

        {result && (
          <span className="text-green-600 font-semibold">
            {result} {buy?.symbol.toUpperCase()}
          </span>
        )}
      </div>

      {inputError && (
        <p className="text-red-500 text-sm mb-4">{inputError}</p>
      )}

      <div className="flex justify-center">
        <button
          onClick={handleExchange}
          className="bg-blue-600 text-white px-10 py-4 rounded-xl text-lg"
        >
          Exchange
        </button>
      </div>
    </div>
  );
};

export default ExchangeCard;
