import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AppRoutes from "./routes/AppRoutes";
import { UIProvider } from "./context/UIContext";
import { Toaster } from "react-hot-toast";
import { healthService } from "./services/auth.service";
import { bootstrapAuth } from "./store/slices/authSlice";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Bootstrap authentication on app start
    dispatch(bootstrapAuth());

    // Run health check every 5 minutes (300,000 ms) in the background
    const intervalId = setInterval(async () => {
      try {
        await healthService();
      } catch (error) {
        console.error("Background health check failed:", error);
      }
    }, 5 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <UIProvider>
        <Toaster position="top-right" reverseOrder={false} />
      <AppRoutes />
    </UIProvider>
  );
}
