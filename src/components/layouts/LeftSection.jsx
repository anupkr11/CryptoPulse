import TopControlsCard from "../cards/TopControlsCard";
import ChartCard from "../cards/ChartCard";
import PortfolioCard from "../cards/PortfolioCard";
import ExchangeCard from "../cards/ExchangeCard";

const LeftSection = () => {
  return (
    <div className="lg:col-span-9 space-y-6">
      <TopControlsCard />
      <ChartCard />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PortfolioCard />
        <ExchangeCard />
      </div>
    </div>
  );
};

export default LeftSection;
