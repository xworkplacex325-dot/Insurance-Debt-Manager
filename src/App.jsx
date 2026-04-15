import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AccountRejectedPage from "./pages/AccountRejectedPage";
import DashboardFormsList from "./pages/DashboardFormsList";
import Settings from "./pages/Settings";
import UserProfileMenu from "./pages/UserProfileMenu";
import AdminPage from "./pages/AdminPage";
import UsersManagementPage from "./pages/UsersManagementPage";
import ProtectedLayout from "./layouts/ProtectedLayout";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import AppToasts from "./components/AppToasts";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <ThemeProvider>
          <AppToasts />
          <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/account-rejected" element={<AccountRejectedPage />} />
            <Route element={<ProtectedLayout />}>
              <Route path="/" element={<DashboardFormsList />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<UserProfileMenu />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/admin/users" element={<UsersManagementPage />} />
            </Route>
          </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
