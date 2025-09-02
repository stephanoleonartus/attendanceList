import React, { useEffect, useState, useMemo } from 'react';
import api from '../services/api';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TableSortLabel,
} from '@mui/material';

const headCells = [
  { id: 'username', label: 'Username' },
  { id: 'email', label: 'Email' },
  { id: 'role', label: 'Role' },
  { id: 'department', label: 'Department' },
  { id: 'designation', label: 'Designation' },
];

function descendingComparator(a, b, orderBy) {
  const aValue = getProperty(a, orderBy);
  const bValue = getProperty(b, orderBy);
  if (bValue < aValue) {
    return -1;
  }
  if (bValue > aValue) {
    return 1;
  }
  return 0;
}

function getProperty(obj, path) {
  return path.split('.').reduce((o, i) => o?.[i], obj);
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('username');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users/employees/');
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users', error);
      }
    };

    fetchUsers();
  }, []);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedUsers = useMemo(() => {
    return [...users].sort(getComparator(order, orderBy));
  }, [users, order, orderBy]);

  return (
    <Paper>
      <Typography variant="h4" gutterBottom sx={{ p: 2 }}>
        User Management
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  sortDirection={orderBy === headCell.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={() => handleRequestSort(headCell.id)}
                  >
                    {headCell.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.user.username}</TableCell>
                <TableCell>{user.user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.department?.name}</TableCell>
                <TableCell>{user.designation?.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default UserManagementPage;
