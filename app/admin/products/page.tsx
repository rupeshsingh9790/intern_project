"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ButtonGroup,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,

} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [editOpen, setEditOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<any>(null);

  const [deleteOpen, setDeleteOpen] = useState(false);

const [deleteId, setDeleteId] = useState<number | null>(null);


const [formData, setFormData] = useState({
  name: "",
  description: "",
  price: "",
  image: "",
});

const [snackbar, setSnackbar] = useState({
  open: false,
  message: "",
  severity: "success",
});

  async function getProducts() {
    const res = await fetch(`/api/products?page=${page}`);
    const data = await res.json();

    setProducts(data.products);
    setTotalPages(data.totalPages);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
}

async function handleSubmit() {
  console.log("handleSubmit called");
  // Product Name Validation
if (!formData.name.trim()) {
  setSnackbar({
    open: true,
    message: "Product name is required.",
    severity: "warning",
  });
  return;
}
// Description
if (!formData.description.trim()) {
  setSnackbar({
    open: true,
    message: "Please enter a description.",
    severity: "warning",
  });
  return;
}

// Price
if (!formData.price || Number(formData.price) <= 0) {
  setSnackbar({
    open: true,
    message: "Please enter a valid price.",
    severity: "warning",
  });
  return;
}

// Image
if (!selectedFile) {
  setSnackbar({
    open: true,
    message: "Please choose a product image.",
    severity: "warning",
  });
  return;
}
  try {
    let imageUrl = "";

    // Upload image
    if (selectedFile) {
      const uploadData = new FormData();
      uploadData.append("image", selectedFile);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      const uploadResult = await uploadRes.json();

      if (!uploadRes.ok) {
  setSnackbar({
    open: true,
    message: uploadResult.message,
    severity: "error",
  });
  return;
}

imageUrl = uploadResult.imageUrl;
      imageUrl = uploadResult.imageUrl;
    }

    console.log("Sending product:", {
      ...formData,
      image: imageUrl,
      price: Number(formData.price),
      userId: 53,
    });

    // Save Product
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        image: imageUrl,
        price: Number(formData.price),
        userId: 53,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setSnackbar({
  open: true,
  message: data.message,
  severity: "success",
});


      setFormData({
        name: "",
        description: "",
        price: "",
        image: "",
      });

      setSelectedFile(null);

      getProducts();
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

async function handleUpdate() {
  try {


    let imageUrl = formData.image;

    // Upload new image only if selected


    if (selectedFile) {
      const uploadData = new FormData();

      uploadData.append("image", selectedFile);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      const uploadResult = await uploadRes.json();

if (!uploadRes.ok) {
  setSnackbar({
    open: true,
    message: uploadResult.message,
    severity: "error",
  });
  return;
}

imageUrl = uploadResult.imageUrl;

    }

    const res = await fetch(`/api/products/${editProduct.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        image: imageUrl,
        price: Number(formData.price),
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

      setFormData({
        name: "",
        description: "",
        price: "",
        image: "",
      });

      setSelectedFile(null);

      setEditProduct(null);

      getProducts();
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
  if (!deleteId) return;

  try {
    const res = await fetch(`/api/products/${deleteId}`, {
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

      getProducts();
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


 function handleOpen(product: any) {
  setSelectedProduct(product);
  setOpen(true);
}

  function handleClose() {
    setOpen(false);
    setSelectedProduct(null);
  }

function handleEdit(product: any) {
  setEditProduct(product);

  setFormData({
    name: product.name,
    description: product.description,
    price: product.price.toString(),
    image: product.image,
  });

  setEditOpen(true);
}

  useEffect(() => {
    getProducts();
  }, [page]);


function handleFileChange(
  e: React.ChangeEvent<HTMLInputElement>
) {
  if (e.target.files && e.target.files[0]) {
    setSelectedFile(e.target.files[0]);
  }
}

function handleSnackbarClose() {
  setSnackbar({
    ...snackbar,
    open: false,
  });
}

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
     <Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 3,
  }}
>
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#1E293B",
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            Products
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{
              color: "#64748B",
              mt: 0.5,
              fontWeight: 500,
            }}
          >
            Manage all products
          </Typography>
        </Box>

        <Button
  variant="contained"
  startIcon={<AddIcon />}
 component={Link}
  href={`/admin/products/add`}
  sx={{
    borderRadius: 2,
    px: 3,
    textTransform: "none",
    fontWeight: 600,
  }}
>
  Add Product
</Button>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} elevation={4}>
        <Table>
          <TableHead
            sx={{
              backgroundColor: "#1976d2",
            }}
          >
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Image
              </TableCell>

              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Name
              </TableCell>

              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Description
              </TableCell>

              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Price
              </TableCell>

              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Created By
              </TableCell>

              <TableCell
                align="center"
                sx={{ color: "white", fontWeight: "bold" }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products.map((product: any) => (
              <TableRow
                key={product.id}
                hover
              >
                <TableCell>
                  <Link href={`/admin/products/${product.id}`}>
  <Image
    src={product.image}
    alt={product.name}
    width={70}
    height={70}
    style={{
      width: "70px",
      height: "70px",
      objectFit: "cover",
      borderRadius: "8px",
      border: "1px solid #ddd",
      cursor: "pointer",
    }}
  />
</Link>
                </TableCell>

                <TableCell>{product.name}</TableCell>

                <TableCell>{product.description}</TableCell>

                <TableCell>
                  ₹ {product.price}
                </TableCell>

                <TableCell>{product.user.name}</TableCell>

                <TableCell align="center">
                  <ButtonGroup
                    variant="outlined"
                    size="small"
                  >
                    
                    <Button
  component={Link}
  href={`/admin/products/edit/${product.id}`}
  color="primary"
  startIcon={<EditIcon />}
>
  Edit
</Button>

                    <Button
  color="error"
  startIcon={<DeleteIcon />}
  onClick={() => {
    setDeleteId(product.id);
    setDeleteOpen(true);
  }}
>
  Delete
</Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
      <Dialog
  open={open}
  onClose={handleClose}
  maxWidth="md"
  fullWidth
>
  <DialogTitle>
    Product Details
  </DialogTitle>

  <DialogContent>
    {selectedProduct && (
      <>
        <Image
          src={selectedProduct.image}
          alt={selectedProduct.name}
          width={400}
          height={300}
          style={{
            width: "100%",
            height: "300px",
            objectFit: "contain",
            borderRadius: "8px",
          }}
        />

       <Typography sx={{ mt: 2 }}>
  <strong>Name:</strong> {selectedProduct.name}
</Typography>

<Typography sx={{ mt: 1 }}>
  <strong>Description:</strong> {selectedProduct.description}
</Typography>

<Typography sx={{ mt: 1 }}>
  <strong>Price:</strong> ₹ {selectedProduct.price}
</Typography>

<Typography sx={{ mt: 1 }}>
  <strong>Created By:</strong> {selectedProduct.user.name}
</Typography>
      </>
    )}
  </DialogContent>

  <DialogActions>
    <Button onClick={handleClose}>
      Close
    </Button>
  </DialogActions>
</Dialog>



<Dialog open={editOpen}>

  <DialogTitle
    sx={{
      fontWeight: 700,
      fontSize: 25,
      pb: 1,
    }}
  >
    Edit Product
  </DialogTitle>

  <DialogContent>


    <Box
  sx={{
    display: "flex",
    flexDirection: "column",
    gap: 3,
    mt: 1,
  }}
>

      <TextField
        label="Product Name"
        fullWidth
        name="name"
        value={formData.name}
        onChange={handleChange}
      />

      <TextField
    label="Description"
    name="description"
    value={formData.description}
    onChange={handleChange}
    multiline
    rows={3}
    fullWidth
/>

      <TextField
    label="Price"
    name="price"
    type="number"
    value={formData.price}
    onChange={handleChange}
    fullWidth
/>
<Button
  variant="outlined"
  component="label"
  sx={{
    textTransform: "none",
    justifyContent: "flex-start",
  }}
>
  Choose Image

  <input
    hidden
    type="file"
    accept="image/*"
    onChange={handleFileChange}
  />
</Button>

{selectedFile && (
  <Typography
    variant="body2"
    color="text.secondary"
  >
    Selected: {selectedFile.name}
  </Typography>
)}
    </Box>

  </DialogContent>

  <DialogActions
    sx={{
      px: 3,
      pb: 3,
    }}
  >

    <Button
      onClick={() => setEditOpen(false)}
      color="inherit"
    >
      Cancel
    </Button>

    <Button
      variant="contained"
      onClick={handleUpdate}
    >
      Update Product
    </Button>

  </DialogActions>

</Dialog>
{/* Delete Dialog */}
<Dialog
  open={deleteOpen}
  onClose={() => setDeleteOpen(false)}
  maxWidth="xs"
  fullWidth
>
  <DialogTitle
    sx={{
      fontWeight: "bold",
      color: "error.main",
    }}
  >
    Delete Product
  </DialogTitle>

  <DialogContent>
    <Typography>
      Are you sure you want to delete this product?
    </Typography>

    <Typography
      variant="body2"
      color="text.secondary"
      sx={{ mt: 1 }}
    >
      This action cannot be undone.
    </Typography>
  </DialogContent>

  <DialogActions sx={{ p: 2 }}>
    <Button
      onClick={() => {
        setDeleteOpen(false);
        setDeleteId(null);
      }}
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
    sx={{ width: "100%" }}
  >
    {snackbar.message}
  </Alert>
</Snackbar>

    </Box>
    
  );
}