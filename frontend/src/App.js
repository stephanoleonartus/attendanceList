import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import AttendancePage from './pages/AttendancePage';
import UserManagementPage from './pages/UserManagementPage';
import HomePage from './pages/HomePage';
import { useAuth } from './hooks/useAuth';
import MainLayout from './components/layout/MainLayout';
import theme from './theme';

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? <MainLayout>{children}</MainLayout> : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  return user?.is_staff ? children : <Navigate to="/dashboard" />;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="user/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/attendance"
            element={
              <ProtectedRoute>
                <AttendancePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-management"
            element={
              <ProtectedRoute>
                <AdminRoute>
                  <UserManagementPage />
                </AdminRoute>
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
