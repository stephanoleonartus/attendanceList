import React, { useEffect, useState } from 'react';
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
} from '@mui/material';

const AttendancePage = () => {
  const [attendance, setAttendance] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
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
              <TableCell>User</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Check In</TableCell>
              <TableCell>Check Out</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendance.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((record) => (
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
