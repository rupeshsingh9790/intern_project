import Navbar from "@/components/customer/Navbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function CheckoutPage() {
  return (
    <>
      <Navbar showSearch={false} showCart={false} />

      <div className="mx-auto max-w-3xl px-6 py-10">

        <h1 className="text-4xl font-bold text-amber-500">
          Delivery Address
        </h1>

        <p className="mt-2 text-slate-300">
          Please enter your delivery details.
        </p>
        <div className="mt-10 rounded-2xl bg-neutral-200 p-8 shadow-amber-200/70 shadow-lg">

         <div className="rounded-xl border p-5 opacity-90">

  <div className="grid gap-6 md:grid-cols-2 text-black">

  <div>
    <Label>Full Name</Label>
    <Input placeholder="Enter your full name"
    className="bg-neutral-100" />
  </div>

  <div>
    <Label>Mobile Number</Label>
    <Input placeholder="Enter mobile number" className="bg-neutral-100" />
  </div>

  <div>
    <Label>Email</Label>
    <Input
      type="email"
      placeholder="Enter your email"
      className="bg-neutral-100"
    />
  </div>

  <div>
    <Label>Pincode</Label>
    <Input placeholder="Pincode" 
    className="bg-neutral-100"/>
  </div>

  <div className="md:col-span-2">
    <Label>Address</Label>
    <Input placeholder="House No., Street, Area" className="bg-neutral-100" />
  </div>

  <div>
    <Label>City</Label>
    <Input placeholder="City" className="bg-neutral-100" />
  </div>

  <div>
    <Label>State</Label>
    <Input placeholder="State" className="bg-neutral-100" />
  </div>

  <div className="md:col-span-2">
    <Label>Landmark (Optional)</Label>
    <Input placeholder="Near School, Hospital..." className="bg-neutral-100" />
  </div>



<div className="mt-6 flex justify-end">

 <Link href="/payment">
  <button className="w-45 rounded-xl bg-amber-500 py-4 font-semibold text-white hover:bg-amber-600">
     Proceed to Payment 
  </button>
</Link>

</div>

</div>

</div>

</div>
</div>
      
    </>
  );
}