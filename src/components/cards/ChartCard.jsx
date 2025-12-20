import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import "../utils/chartSetup";
import { RANGE_MAP } from "../utils/chartRanges";
import ChartTypeDropdown from "../dropdowns/ChartTypeDropdown";
import CryptoDropdown from "../dropdowns/CryptoDropdown";



import {
  setChartRange,
  setChartType,
  setSelectedCoins,
} from "../redux/slices/uiSlice";

const COLORS = [
  "#2563eb", // blue
  "#16a34a", // green
  "#dc2626", // red
  "#7c3aed", // purple
  "#ea580c", // orange
];

const formatLabel = (timestamp, range) => {
  const date = new Date(timestamp);
  if (range === "1") {
    // 1D → show time
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return date.toLocaleDateString();
};

const ChartCard = () => {
  const dispatch = useDispatch();

  const { selectedCoins, chartRange, chartType } = useSelector(
    (state) => state.ui
  );
  const baseCurrency = useSelector(
    (state) => state.ui.baseCurrency
  );

  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  const fetchChartData = async () => {
    if (!selectedCoins || selectedCoins.length === 0) return;

    setLoading(true);

    try {
      let labels = [];
      const datasets = [];

      for (let i = 0; i < selectedCoins.length; i++) {
        const coinId = selectedCoins[i];

        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${baseCurrency}&days=${chartRange}`
        );
        const data = await res.json();

        // Labels only once (from first coin)
        if (i === 0) {
          labels = data.prices.map((p) =>
            formatLabel(p[0], chartRange)
          );
        }

        datasets.push({
          label: coinId.toUpperCase(),
          data: data.prices.map((p) => p[1]),
          borderColor: COLORS[i % COLORS.length],
          backgroundColor:
            chartType === "bar"
              ? COLORS[i % COLORS.length]
              : "transparent",
          tension: 0.4,
          fill: false,
        });
      }

      setChartData({ labels, datasets });
    } catch (err) {
      console.error("Chart data fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  fetchChartData();
}, [selectedCoins, chartRange, baseCurrency, chartType]);


  const ChartComponent = chartType === "bar" ? Bar : Line;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      
      {/* Top Controls */}
      <div className="flex justify-between items-center mb-6">
        
        {/* Time Filters */}
        <div className="flex gap-2">
          {Object.keys(RANGE_MAP).map((label) => (
            <button
              key={label}
              onClick={() =>
                dispatch(setChartRange(RANGE_MAP[label]))
              }
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                chartRange === RANGE_MAP[label]
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Dropdowns */}
        <div className="flex gap-4">
          <ChartTypeDropdown />
          <CryptoDropdown />
        </div>
      </div>

      {/* Chart */}
      <div className="h-[350px]">
        {loading && (
          <p className="text-center text-gray-400 mt-20">
            Loading chart data...
          </p>
        )}

        {!loading && chartData && (
          <ChartComponent
  key={`${chartType}-${chartRange}-${selectedCoins.join("-")}`}
  data={chartData}
  options={{
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
      },
    },
  }}
/>

        )}
      </div>
    </div>
  );
};

export default ChartCard;