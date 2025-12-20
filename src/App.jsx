import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchMarketData } from "./components/redux/slices/marketSlice";
import Dashboard from "./pages/Dashboard";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMarketData());
  }, [dispatch]);

  return <Dashboard />;
}

export default App;
