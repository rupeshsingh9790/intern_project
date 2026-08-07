import Navbar from "@/components/customer/Navbar";
import SignupForm from "../../components/customer/SignupForm";

export default function SignupPage() {
  return (
    <>
      <Navbar
        showSearch={false}
        showCart={false}
      />

      <main className="flex min-h-[80vh] items-center justify-center bg-slate-50 px-4">
        <SignupForm />
      </main>
    </>
  );
}