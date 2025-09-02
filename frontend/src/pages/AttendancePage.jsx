import React, { useEffect, useState, useMemo } from 'react';
import api from '../services/api';
import { useAuth } from '../hooks/useAuth';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Typography,
  TableSortLabel,
} from '@mui/material';

const headCells = [
  { id: 'user', label: 'User' },
  { id: 'date', label: 'Date' },
  { id: 'check_in', label: 'Check In' },
  { id: 'check_out', label: 'Check Out' },
  { id: 'status', label: 'Status' },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const AttendancePage = () => {
  const [attendance, setAttendance] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('date');
  const { user } = useAuth();

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const endpoint = user.is_staff ? '/attendance/all-history/' : '/attendance/history/';
        const response = await api.get(endpoint);
        setAttendance(response.data);
      } catch (error) {
        console.error('Failed to fetch attendance', error);
      }
    };

    if (user) {
      fetchAttendance();
    }
  }, [user]);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedAttendance = useMemo(() => {
    return [...attendance].sort(getComparator(order, orderBy));
  }, [attendance, order, orderBy]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper>
      <Typography variant="h4" gutterBottom sx={{ p: 2 }}>
        Attendance History
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
            {sortedAttendance.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.user}</TableCell>
                <TableCell>{record.date}</TableCell>
                <TableCell>{record.check_in}</TableCell>
                <TableCell>{record.check_out}</TableCell>
                <TableCell>{record.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={attendance.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default AttendancePage;
