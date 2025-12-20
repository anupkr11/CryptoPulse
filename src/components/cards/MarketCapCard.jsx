import { useSelector } from "react-redux";

const MarketCapCard = () => {
  const { coins, loading, error } = useSelector(
    (state) => state.market
  );

  const baseCurrency = useSelector(
    (state) => state.ui.baseCurrency
  ); // "usd" or "inr"

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!coins || coins.length === 0) return null;

  const sortedCoins = [...coins].sort(
    (a, b) => b.market_cap - a.market_cap
  );

  const formatMarketCap = (value) => {
    if (!value) return "--";
    if (value >= 1e12) return (value / 1e12).toFixed(2) + "T";
    if (value >= 1e9) return (value / 1e9).toFixed(2) + "B";
    if (value >= 1e6) return (value / 1e6).toFixed(2) + "M";
    return value.toLocaleString();
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      
      {/* Header */}
      <h3 className="text-lg font-semibold mb-6">
        Cryptocurrency by market cap
      </h3>

      <div className="space-y-5 max-h-[725px] overflow-y-auto pr-2">
        {sortedCoins.map((coin) => {
          const marketCap =
            baseCurrency === "usd"
              ? coin.market_cap
              : (coin.market_cap * coin.current_price_inr) /
                coin.current_price;

          const isPositive =
            coin.price_change_percentage_24h >= 0;

          return (
            <div
              key={coin.id}
              className="flex justify-between items-center"
            >
              {/* Left */}
              <div>
                <p className="font-medium text-sm">
                  {coin.name}
                </p>
                <p className="text-xs text-gray-400">
                  Mkt.Cap {baseCurrency.toUpperCase()}{" "}
                  {formatMarketCap(marketCap)}
                </p>
              </div>

              {/* Right */}
              <div
                className={`flex items-center text-sm font-medium ${
                  isPositive
                    ? "text-green-500"
                    : "text-orange-500"
                }`}
              >
                {isPositive ? "▲" : "▼"}{" "}
                {Math.abs(
                  coin.price_change_percentage_24h
                ).toFixed(2)}
                %
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MarketCapCard;
