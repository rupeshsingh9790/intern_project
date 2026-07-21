"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

export default function AddProductPage() {
  const router = useRouter();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

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

  async function handleSubmit() {
      console.log("handleSubmit called");
      console.log(formData);
 
  // Product Name
  if (!formData.name.trim()) {
    setSnackbar({
  open: true,
  message: "Product Name is required.",
  severity: "warning",
});
return;
  }

  // Description
  if (!formData.description.trim()) {
    setSnackbar({
      open: true,
      message: "Description is required.",
      severity: "warning",
    });
    return;
  }

  // Price Required
  if (!formData.price.trim()) {
    setSnackbar({
      open: true,
      message: "Price is required.",
      severity: "warning",
    });
    return;
  }

  // Price Validation
  if (Number(formData.price) <= 0) {
    setSnackbar({
      open: true,
      message: "Price must be greater than 0.",
      severity: "warning",
    });
    return;
  }

  // Image Required
  if (!selectedFile) {
    setSnackbar({
      open: true,
      message: "Please select an image.",
      severity: "warning",
    });
    return;
  }

  setLoading(true);
    try {
      let imageUrl = "";

      // Upload Image
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
          userId: 53, // Replace later with logged-in user
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);

        router.push("/admin/products");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  }

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
          Add Product
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
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            fullWidth
          />

          <TextField
            label="Description"
            value={formData.description}
            multiline
            rows={3}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
            fullWidth
          />

          <TextField
            label="Price"
            type="number"
            value={formData.price}
            onChange={(e) =>
              setFormData({
                ...formData,
                price: e.target.value,
              })
            }
            fullWidth
          />

          <img
            src={
              selectedFile
                ? URL.createObjectURL(selectedFile)
                : formData.image
            }
            alt="Preview"
            style={{
              width: "200px",
              height: "200px",
              objectFit: "contain",
              border: "1px solid #ddd",
              borderRadius: "10px",
            }}
          />

          <Button
            variant="outlined"
            component="label"
          >
            Choose Image

            <input
              hidden
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmit}
          >
            Add Product
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