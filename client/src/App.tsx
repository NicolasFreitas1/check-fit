import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/theme/theme-provider";
import { router } from "./routes";
import { Toaster } from "sonner";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="check-fit-theme">
      <Toaster richColors />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
