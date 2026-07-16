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
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function AddProductPage() {
  const router = useRouter();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  function handleFileChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  }

  async function handleSubmit() {
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
    </Box>
  );
}