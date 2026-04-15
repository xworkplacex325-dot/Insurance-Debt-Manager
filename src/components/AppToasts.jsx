import { ToastContainer } from "react-toastify";
import { useTheme } from "../contexts/ThemeContext";

export default function AppToasts() {
  const { theme } = useTheme();

  return (
    <ToastContainer
      position="top-right"
      autoClose={4000}
      closeOnClick
      pauseOnHover
      theme={theme === "dark" ? "dark" : "light"}
    />
  );
}
