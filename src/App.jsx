import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginPage from './pages/LoginPage';
import DashboardFormsList from './pages/DashboardFormsList';
import Settings from './pages/Settings';
import UserProfileMenu from './pages/UserProfileMenu';
import { ThemeProvider } from './contexts/ThemeContext';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<DashboardFormsList />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<UserProfileMenu />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
