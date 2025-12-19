const PortfolioCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="h-6 w-32 bg-gray-100 rounded mb-6"></div>
      <div className="flex gap-6">
        <div className="h-40 w-40 bg-gray-100 rounded-full"></div>
        <div className="flex-1 space-y-4">
          <div className="h-4 w-24 bg-gray-100 rounded"></div>
          <div className="h-4 w-20 bg-gray-100 rounded"></div>
          <div className="h-4 w-28 bg-gray-100 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
