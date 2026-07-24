import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "Arial",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: "250px",
          backgroundColor: "#1e293b",
          color: "white",
          padding: "20px",
        }}
      >
        <h2>Admin Panel</h2>

        <hr style={{ margin: "20px 0" }} />

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <Link
            href="/admin/dashboard"
            style={{ color: "white", textDecoration: "none" }}
          >
            🏠 Dashboard
          </Link>

          <Link
            href="/admin/users"
            style={{ color: "white", textDecoration: "none" }}
          >
            👤 Users
          </Link>

          <Link
            href="/admin/products"
            style={{ color: "white", textDecoration: "none" }}
          >
            📦 Products
          </Link>

          <Link
  href="/admin/orders"
  style={{ color: "white", textDecoration: "none" }}
>
  🛒 Orders
</Link>

          <Link
            href="/"
            style={{
              color: "#ff6b6b",
              textDecoration: "none",
              marginTop: "30px",
            }}
          >
            🚪 Logout
          </Link>

          
        </nav>
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          padding: "30px",
          background: "#f5f5f5",
        }}
      >
        {children}
      </div>
    </div>
  );
}