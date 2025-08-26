import React from 'react';
import { useAuth } from '../hooks/useAuth';
import AdminDashboard from '../components/dashboard/AdminDashboard';
import EmployeeDashboard from '../components/dashboard/EmployeeDashboard';

const DashboardPage = () => {
  const { user } = useAuth();

  return user?.is_staff ? <AdminDashboard /> : <EmployeeDashboard />;
};

export default DashboardPage;
