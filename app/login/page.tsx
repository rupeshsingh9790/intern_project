import Navbar from "@/components/customer/Navbar";
import LoginForm from "@/components/customer/LoginForm";

export default function LoginPage() {
  return (
    <>
      
      <Navbar
  showSearch={false}
  showCart={false}
/>

      <main className="flex min-h-[80vh] items-center justify-center bg-slate-50">
        <LoginForm />
      </main>
    </>
  );
}