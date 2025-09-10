import React, { useEffect, useState } from 'react';
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
  Button,
  Box,
  Modal,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    full_name: '',
    role: 'Employee',
    department: '',
    designation: '',
    password2: '',
  });

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users/employees/');
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users', error);
    }
  };

  useEffect(() => {
    fetchUsers();
    const fetchDepsAndDesigs = async () => {
      try {
        const depsRes = await api.get('/users/departments/');
        const desigsRes = await api.get('/users/designations/');
        setDepartments(depsRes.data);
        setDesignations(desigsRes.data);
      } catch (error) {
        console.error('Failed to fetch departments or designations', error);
      }
    };
    fetchDepsAndDesigs();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newUser.password !== newUser.password2) {
      alert("Passwords don't match");
      return;
    }
    try {
      await api.post('/users/admin-create-user/', newUser);
      handleClose();
      fetchUsers(); // Refresh users list
    } catch (error) {
      console.error('Failed to create user', error);
      alert('Failed to create user. Check console for details.');
    }
  };

  const [editUser, setEditUser] = useState(null);

  const handleEdit = (user) => {
    setEditUser(user);
    setEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.patch(`/users/employees/${editUser.id}/`, editUser);
      setEditModalOpen(false);
      fetchUsers();
    } catch (error) {
      console.error('Failed to update user', error);
      alert('Failed to update user. Check console for details.');
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await api.delete(`/users/employees/${userId}/`);
        fetchUsers();
      } catch (error) {
        console.error('Failed to delete user', error);
        alert('Failed to delete user. Check console for details.');
      }
    }
  };

  return (
    <Paper>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom component="div">
          User Management
        </Typography>
        <Button onClick={handleOpen} variant="contained">Add User</Button>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={handleSubmit}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New User
          </Typography>
          <TextField margin="normal" required fullWidth label="Username" name="username" onChange={handleChange} />
          <TextField margin="normal" required fullWidth label="Email" name="email" type="email" onChange={handleChange} />
          <TextField margin="normal" required fullWidth label="Password" name="password" type="password" onChange={handleChange} />
          <TextField margin="normal" required fullWidth label="Confirm Password" name="password2" type="password" onChange={handleChange} />
          <TextField margin="normal" required fullWidth label="Full Name" name="full_name" onChange={handleChange} />
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select name="role" value={newUser.role} label="Role" onChange={handleChange}>
              <MenuItem value="Employee">Employee</MenuItem>
              <MenuItem value="HR">HR</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Department</InputLabel>
            <Select name="department" value={newUser.department} label="Department" onChange={handleChange}>
              {departments.map(dep => <MenuItem key={dep.id} value={dep.id}>{dep.name}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Designation</InputLabel>
            <Select name="designation" value={newUser.designation} label="Designation" onChange={handleChange}>
              {designations.map(des => <MenuItem key={des.id} value={des.id}>{des.name}</MenuItem>)}
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>Create User</Button>
        </Box>
      </Modal>

      {editUser && (
        <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
          <Box sx={style} component="form" onSubmit={handleEditSubmit}>
            <Typography variant="h6" component="h2">
              Edit User
            </Typography>
            <TextField margin="normal" fullWidth label="Username" name="username" value={editUser.user.username} disabled />
            <TextField margin="normal" fullWidth label="Email" name="email" value={editUser.user.email} onChange={handleEditChange} />
            <TextField margin="normal" fullWidth label="Full Name" name="full_name" value={`${editUser.user.first_name} ${editUser.user.last_name}`} onChange={handleEditChange} />
            <FormControl fullWidth margin="normal">
              <InputLabel>Role</InputLabel>
              <Select name="role" value={editUser.role} label="Role" onChange={handleEditChange}>
                <MenuItem value="Employee">Employee</MenuItem>
                <MenuItem value="HR">HR</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Department</InputLabel>
              <Select name="department" value={editUser.department?.id} label="Department" onChange={handleEditChange}>
                {departments.map(dep => <MenuItem key={dep.id} value={dep.id}>{dep.name}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Designation</InputLabel>
              <Select name="designation" value={editUser.designation?.id} label="Designation" onChange={handleEditChange}>
                {designations.map(des => <MenuItem key={des.id} value={des.id}>{des.name}</MenuItem>)}
              </Select>
            </FormControl>
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>Save Changes</Button>
          </Box>
        </Modal>
      )}

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.user.username}</TableCell>
                <TableCell>{user.user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.department?.name}</TableCell>
                <TableCell>{user.designation?.name}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(user)}>Edit</Button>
                  <Button onClick={() => handleDelete(user.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default UserManagementPage;
