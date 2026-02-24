import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { UIProvider } from "./context/UIContext";
import { Toaster } from "react-hot-toast";
export default function App() {
  return (
    <AuthProvider>
      <UIProvider>
          <Toaster position="top-right" reverseOrder={false} />
        <AppRoutes />
      </UIProvider>
    </AuthProvider>
  );
}
