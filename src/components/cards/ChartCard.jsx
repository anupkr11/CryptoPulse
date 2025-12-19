const ChartCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex gap-3 mb-6">
        {Array(5).fill(0).map((_, i) => (
          <div key={i} className="h-9 w-12 bg-gray-100 rounded-lg" />
        ))}
        <div className="ml-auto flex gap-3">
          <div className="h-9 w-36 bg-gray-100 rounded-lg" />
          <div className="h-9 w-32 bg-gray-100 rounded-lg" />
        </div>
      </div>
      <div className="h-64 bg-gray-100 rounded-lg"></div>
    </div>
  );
};

export default ChartCard;
