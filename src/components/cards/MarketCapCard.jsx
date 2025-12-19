const MarketCapCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 space-y-5">
      <div className="h-6 w-44 bg-gray-100 rounded mb-4"></div>

      {Array(7).fill(0).map((_, i) => (
        <div key={i} className="flex justify-between items-center">
          <div className="space-y-2">
            <div className="h-4 w-24 bg-gray-100 rounded"></div>
            <div className="h-3 w-20 bg-gray-100 rounded"></div>
          </div>
          <div className="h-4 w-12 bg-gray-100 rounded"></div>
        </div>
      ))}
    </div>
  );
};

export default MarketCapCard;
