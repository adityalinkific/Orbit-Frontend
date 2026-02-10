import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { UIProvider } from "./context/UIContext";

export default function App() {
  return (
    <AuthProvider>
      <UIProvider>
        <AppRoutes />
      </UIProvider>
    </AuthProvider>
  );
}
