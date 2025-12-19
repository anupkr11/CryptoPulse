import LeftSection from "./LeftSection";
import RightSection from "./RightSection";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        <LeftSection />
        <RightSection />
      </div>
    </div>
  );
};

export default DashboardLayout;
