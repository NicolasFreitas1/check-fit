import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/theme/theme-provider";
import { router } from "./routes";
import { Toaster } from "sonner";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="check-fit-theme">
      <AuthProvider>
        <Toaster richColors />
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
