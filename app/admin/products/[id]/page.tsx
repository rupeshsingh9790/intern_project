"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import {
  Box,
  Paper,
  Typography,
  Button,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    async function getProduct() {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();

      console.log("Product Data:", data);

      console.log(data);

      setProduct(data);
    }

    if (id) {
      getProduct();
    }
  }, [id]);

  if (!product) {
    return <h2>Loading...</h2>;
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
      Back to Products
    </Button>

    <Paper
      elevation={4}
      sx={{
        display: "flex",
        gap: 5,
        p: 4,
        borderRadius: 3,
      }}
    >
      {/* Image */}
      <Box flex={1}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            maxHeight: "450px",
            objectFit: "contain",
            borderRadius: "10px",
          }}
        />
      </Box>

      {/* Details */}
      <Box flex={1}>
        <Typography variant="h4" fontWeight={700}>
          {product.name}
        </Typography>

        <Typography
          mt={3}
          color="text.secondary"
        >
          {product.description}
        </Typography>

        <Typography
          mt={3}
          variant="h5"
          color="primary"
          fontWeight={700}
        >
          ₹ {product.price}
        </Typography>

        <Typography mt={3}>
          Product ID : {product.id}
        </Typography>

        <Typography>
          Created By : {product.user.name}
        </Typography>
      </Box>
    </Paper>
  </Box>
);
}