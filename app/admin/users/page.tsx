"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Pagination,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [role, setRole] = useState("ALL");
  const [status, setStatus] = useState("ALL");

  async function getUsers() {
    const res = await fetch(
      `/api/users?page=${page}&role=${role}&status=${status}`
    );

    const data = await res.json();

    setUsers(data.users);
    setTotalPages(data.totalPages);
  }

  useEffect(() => {
    getUsers();
  }, [page, role, status]);

  async function toggleStatus(id: number, active: boolean) {
    const confirmAction = confirm(
      `Are you sure you want to ${
        active ? "deactivate" : "activate"
      } this user?`
    );

    if (!confirmAction) return;

    const res = await fetch(`/api/users/${id}`, {
      method: "PATCH",
    });

    const data = await res.json();

    if (res.ok) {
      alert(data.message);
      getUsers();
    } else {
      alert(data.message);
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 3,
  }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: "#1E293B",
            letterSpacing: 1,
          }}
        >
          Users
        </Typography>

        <Typography variant="subtitle1" color="text.secondary">
          Manage all registered users
        </Typography>
      </Box>

      {/* Filters */}
      <Box  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 3,
  }}>
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Role</InputLabel>

          <Select
            value={role}
            label="Role"
            onChange={(e) => {
              setPage(1);
              setRole(e.target.value);
            }}
          >
            <MenuItem value="ALL">All Roles</MenuItem>
            <MenuItem value="ADMIN">Admin</MenuItem>
            <MenuItem value="USER">User</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Status</InputLabel>

          <Select
            value={status}
            label="Status"
            onChange={(e) => {
              setPage(1);
              setStatus(e.target.value);
            }}
          >
            <MenuItem value="ALL">All Status</MenuItem>
            <MenuItem value="ACTIVE">Active</MenuItem>
            <MenuItem value="INACTIVE">Inactive</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Table */}
      <Paper elevation={3}>
        <table
          border={1}
          cellPadding={10}
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "white",
            color: "black",
          }}
        >
          <thead
            style={{
              background: "#1976d2",
              color: "white",
            }}
          >
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user: any) => (
              <tr key={user.id}>
                <td>{user.name}</td>

                <td>{user.email}</td>

                <td>{user.mobile}</td>

                <td>{user.role}</td>

                <td>
                  {user.isActive
                    ? "🟢 Active"
                    : "🔴 Inactive"}
                </td>

                <td>
                  <button
                    onClick={() =>
                      toggleStatus(user.id, user.isActive)
                    }
                    style={{
                      padding: "8px 14px",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      background: user.isActive
                        ? "#dc3545"
                        : "#28a745",
                      color: "white",
                    }}
                  >
                    {user.isActive
                      ? "Deactivate"
                      : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Paper>

      {/* Pagination */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 4,
        }}
      >
        <Pagination
          count={totalPages}
          page={page}
          color="primary"
          shape="rounded"
          onChange={(event, value) => setPage(value)}
        />
      </Box>
    </Box>
  );
}