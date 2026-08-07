"use client";

import { useEffect, useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Snackbar,
  Alert,
  Dialog,
DialogTitle,
DialogContent,
DialogActions,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [name, setName] = useState("");

  const [editOpen, setEditOpen] = useState(false);
const [editId, setEditId] = useState<number | null>(null);
const [editName, setEditName] = useState("");

const [deleteOpen, setDeleteOpen] = useState(false);
const [deleteId, setDeleteId] = useState<number | null>(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  async function getCategories() {
    try {
      const res = await fetch("/api/categories");

      const data = await res.json();

      if (res.ok) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error(error);

      setSnackbar({
        open: true,
        message: "Failed to load categories",
        severity: "error",
      });
    }
  }

  async function handleAddCategory() {
    if (!name.trim()) {
      setSnackbar({
        open: true,
        message: "Category name is required",
        severity: "warning",
      });

      return;
    }

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSnackbar({
          open: true,
          message: data.message,
          severity: "success",
        });

        setName("");

        getCategories();
      } else {
        setSnackbar({
          open: true,
          message: data.message,
          severity: "error",
        });
      }
    } catch (error) {
      console.error(error);

      setSnackbar({
        open: true,
        message: "Something went wrong",
        severity: "error",
      });
    }
  }

  async function handleEdit() {
  if (!editName.trim() || !editId) {
    return;
  }

  try {
    const res = await fetch(`/api/categories/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: editName.trim(),
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setSnackbar({
        open: true,
        message: data.message,
        severity: "success",
      });

      setEditOpen(false);
      setEditId(null);
      setEditName("");

      getCategories();
    } else {
      setSnackbar({
        open: true,
        message: data.message,
        severity: "error",
      });
    }
  } catch (error) {
    console.error(error);

    setSnackbar({
      open: true,
      message: "Something went wrong",
      severity: "error",
    });
  }
}

async function handleDelete() {
  if (!deleteId) {
    return;
  }

  try {
    const res = await fetch(`/api/categories/${deleteId}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (res.ok) {
      setSnackbar({
        open: true,
        message: data.message,
        severity: "success",
      });

      setDeleteOpen(false);
      setDeleteId(null);

      getCategories();
    } else {
      setSnackbar({
        open: true,
        message: data.message,
        severity: "error",
      });
    }
  } catch (error) {
    console.error(error);

    setSnackbar({
      open: true,
      message: "Something went wrong",
      severity: "error",
    });
  }
}

  function handleSnackbarClose() {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}

      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: "#1E293B",
          }}
        >
          Categories
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{
            color: "#64748B",
            mt: 0.5,
          }}
        >
          Manage product categories
        </Typography>
      </Box>

      {/* Add Category */}

      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 4,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            mb: 2,
          }}
        >
          Add New Category
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
          }}
        >
          <TextField
            label="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddCategory}
            sx={{
              height: 56,
              px: 3,
              whiteSpace: "nowrap",
            }}
          >
            Add Category
          </Button>
        </Box>
      </Paper>

      {/* Category List */}

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead
            sx={{
              backgroundColor: "#1976d2",
            }}
          >
            <TableRow>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                ID
              </TableCell>

              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Category Name
              </TableCell>

             <TableCell
  align="center"
  sx={{
    color: "white",
    fontWeight: "bold",
  }}
>
  Products
</TableCell>

<TableCell
  align="center"
  sx={{
    color: "white",
    fontWeight: "bold",
  }}
>
  Actions
</TableCell>

            </TableRow>
          </TableHead>

          <TableBody>
            {categories.map((category) => (
              <TableRow
                key={category.id}
                hover
              >
                <TableCell>
                  {category.id}
                </TableCell>

                <TableCell>
                  {category.name}
                </TableCell>

                <TableCell align="center">
  <Typography
    sx={{
      fontWeight: 600,
    }}
  >
    {category._count?.products ?? 0}
  </Typography>
</TableCell>

                <TableCell align="center">
  <Button
    variant="outlined"
    size="small"
    startIcon={<EditIcon />}
    sx={{ mr: 1 }}
    onClick={() => {
      setEditId(category.id);
      setEditName(category.name);
      setEditOpen(true);
    }}
  >
    Edit
  </Button>

  <Button
    variant="outlined"
    color="error"
    size="small"
    startIcon={<DeleteIcon />}
    onClick={() => {
      setDeleteId(category.id);
      setDeleteOpen(true);
    }}
  >
    Delete
  </Button>
</TableCell>

              </TableRow>
            ))}

            
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
  open={editOpen}
  onClose={() => setEditOpen(false)}
>
  <DialogTitle>Edit Category</DialogTitle>

  <DialogContent>
    <TextField
      label="Category Name"
      value={editName}
      onChange={(e) => setEditName(e.target.value)}
      fullWidth
      sx={{ mt: 1 }}
    />
  </DialogContent>

  <DialogActions>
    <Button onClick={() => setEditOpen(false)}>
      Cancel
    </Button>

    <Button
      variant="contained"
      onClick={handleEdit}
    >
      Update
    </Button>
  </DialogActions>
</Dialog>

<Dialog
  open={deleteOpen}
  onClose={() => setDeleteOpen(false)}
>
  <DialogTitle>
    Delete Category
  </DialogTitle>

  <DialogContent>
    <Typography>
      Are you sure you want to delete this category?
    </Typography>
  </DialogContent>

  <DialogActions>
    <Button
      onClick={() => setDeleteOpen(false)}
    >
      Cancel
    </Button>

    <Button
      variant="contained"
      color="error"
      onClick={handleDelete}
    >
      Delete
    </Button>
  </DialogActions>
</Dialog>

      {/* Snackbar */}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity as any}
          variant="filled"
          sx={{
            width: "100%",
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}