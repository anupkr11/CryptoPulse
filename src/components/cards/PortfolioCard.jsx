import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PortfolioCard = () => {
  const data = {
    labels: ["Tether", "Luna", "Ethereum"],
    datasets: [
      {
        data: [375, 375, 250],
        backgroundColor: ["#4F9CF9", "#FF8B8B", "#58C7B2"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "right",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          boxWidth: 8,
          padding: 20,
          font: {
            size: 14,
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-lg">Portfolio</h3>
        <p className="text-sm text-gray-400">
          Total value <span className="text-black font-semibold">$1000</span>
        </p>
      </div>

      {/* Chart */}
      <div className="h-52">
        <Pie data={data} options={options} />
      </div>

    </div>
  );
};

export default PortfolioCard;
