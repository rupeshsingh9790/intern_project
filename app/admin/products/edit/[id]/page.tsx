"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";

export default function EditProductPage() {
  const { id } = useParams();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

function handleSnackbarClose() {
  setSnackbar({
    ...snackbar,
    open: false,
  });
}

  async function getProduct() {
    const res = await fetch(`/api/products/${id}`);
    const data = await res.json();

    setFormData({
      name: data.name,
      description: data.description,
      price: data.price.toString(),
      image: data.image,
    });
  }

  function handleFileChange(
  e: React.ChangeEvent<HTMLInputElement>
) {
  if (e.target.files && e.target.files[0]) {
    setSelectedFile(e.target.files[0]);
  }
}
async function handleUpdate() {

 // Product Name
if (!formData.name.trim()) {
  setSnackbar({
  open: true,
  message: "Product Name is required",
  severity: "warning",
});
return;
}

// Description
if (!formData.description.trim()) {
  setSnackbar({
  open: true,
  message: "Description is required",
  severity: "warning",
});
return;
}

// Price Empty
if (!formData.price.toString().trim()) {
  setSnackbar({
  open: true,
  message: "Price is required",
  severity: "warning",
});
return;
}

// Price Number
if (isNaN(Number(formData.price))) {
  setSnackbar({
  open: true,
  message: "Price must be a valid number",
  severity: "warning",
});
return;
}

// Price Greater than 0
if (Number(formData.price) <= 0) {
  setSnackbar({
  open: true,
  message: "Price must be greater than 0",
  severity: "warning",
});
return;
}

// Image Required (only if no old image and no new image)
if (!selectedFile && !formData.image) {
  setSnackbar({
  open: true,
  message: "Please select an image",
  severity: "warning",
});
return;
}



  try {
    let imageUrl = formData.image;

    // Upload new image if selected
    if (selectedFile) {
      const uploadData = new FormData();

      uploadData.append("image", selectedFile);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      const uploadResult = await uploadRes.json();

      if (!uploadRes.ok) {
        alert(uploadResult.message);
        return;
      }

      imageUrl = uploadResult.imageUrl;
    }

    // Update Product
    const res = await fetch(`/api/products/${id}`, {
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
      alert(data.message);
      getProduct(); // Refresh the page with updated data
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  }
}

  useEffect(() => {
    if (id) {
      getProduct();
    }
  }, [id]);

 return (
  <Box sx={{ p: 4 }}>
    <Button
      component={Link}
      href="/admin/products"
      startIcon={<ArrowBackIcon />}
      variant="outlined"
      sx={{ mb: 3 }}
    >
      Back
    </Button>

    <Paper
      elevation={4}
      sx={{
        p: 4,
        maxWidth: 700,
        mx: "auto",
      }}
    >
      <Typography
        variant="h4"
        mb={3}
        fontWeight={700}
      >
        Edit Product
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <TextField
          label="Product Name"
          name="name"
          value={formData.name}
          fullWidth
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        <TextField
  label="Description"
  name="description"
  value={formData.description}
  multiline
  rows={3}
  fullWidth
  onChange={(e) =>
    setFormData({
      ...formData,
      description: e.target.value,
    })
  }
/>
<TextField
  label="Price"
  name="price"
  value={formData.price}
  type="number"
  fullWidth
  onChange={(e) =>
    setFormData({
      ...formData,
      price: e.target.value,
    })
  }
/>

<img
  src={
    selectedFile
      ? URL.createObjectURL(selectedFile)
      : formData.image
  }
  alt="Product"
  style={{
    width: "200px",
    height: "200px",
    objectFit: "contain",
    border: "1px solid #ddd",
    borderRadius: "10px",
    marginBottom: "15px",
  }}
/>

<Button
  variant="outlined"
  component="label"
>
  Change Image

  <input
    hidden
    type="file"
    accept="image/*"
    onChange={handleFileChange}
  />
</Button>
        <Button variant="contained" 
        onClick={handleUpdate}>
          Update Product
        </Button>
      </Box>
    </Paper>

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