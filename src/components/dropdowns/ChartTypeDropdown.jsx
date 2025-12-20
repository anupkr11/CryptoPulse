import { useDispatch, useSelector } from "react-redux";
import { setChartType } from "../redux/slices/uiSlice";
import { useState } from "react";

const chartTypes = [
  { label: "Line", value: "line" },
  { label: "Bar chart vertical", value: "bar" },
];

const ChartTypeDropdown = () => {
  const dispatch = useDispatch();
  const chartType = useSelector((state) => state.ui.chartType);
  const [open, setOpen] = useState(false);

  const selectedLabel =
    chartTypes.find((c) => c.value === chartType)?.label;

  return (
    <div className="relative w-48">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-4 py-3 bg-white border rounded-xl shadow-sm text-sm font-medium"
      >
        Chart type
        <span>▼</span>
      </button>

      {open && (
        <div className="absolute mt-2 w-full bg-white rounded-xl shadow-lg border z-20">
          {chartTypes.map((type) => (
            <div
              key={type.value}
              onClick={() => {
                dispatch(setChartType(type.value));
                setOpen(false);
              }}
              className={`px-4 py-3 cursor-pointer text-sm ${
                chartType === type.value
                  ? "bg-red-50 font-medium"
                  : "hover:bg-gray-100"
              }`}
            >
              {type.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChartTypeDropdown;
