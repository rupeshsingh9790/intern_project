import prisma from "@/lib/prisma";

export default async function DashboardPage() {

  const totalUsers = await prisma.user.count();

  const totalProducts = await prisma.product.count();

  return (
    <>
      <h1 style={{ color: "black" }}>Dashboard</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {/* Users Card */}

        <div
          style={{
            background: "white",
            color: "black",
            padding: "20px",
            width: "220px",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Total Users</h3>

          <h1>{totalUsers}</h1>
        </div>

        {/* Products Card */}

        <div
          style={{
            background: "white",
            color: "black",
            padding: "20px",
            width: "220px",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Total Products</h3>

          <h1>{totalProducts}</h1>
        </div>

      </div>
    </>
  );
}