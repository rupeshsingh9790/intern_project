"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/customer/Navbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CheckoutPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
  fullName: "",
  mobile: "",
  email: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  landmark: "",
});
const [errors, setErrors] = useState<Record<string, string>>({});

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const validateForm = () => {
  const newErrors: Record<string, string> = {};

 if (!formData.fullName.trim()) {
  newErrors.fullName = "Full Name is required";
} else if (!/^[A-Za-z ]+$/.test(formData.fullName)) {
  newErrors.fullName = "Only letters are allowed";
} else if (formData.fullName.trim().length < 3) {
  newErrors.fullName = "Minimum 3 characters required";
}
 if (!formData.mobile.trim()) {
  newErrors.mobile = "Mobile Number is required";
} else if (!/^[0-9]{10}$/.test(formData.mobile)) {
  newErrors.mobile = "Mobile number must be exactly 10 digits";
}

 if (!formData.email.trim()) {
  newErrors.email = "Email is required";
} else if (
  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
) {
  newErrors.email = "Invalid email address";
}

  if (!formData.address.trim()) {
  newErrors.address = "Address is required";
} else if (formData.address.trim().length < 10) {
  newErrors.address = "Address must be at least 10 characters";
}

  if (!formData.city.trim()) {
  newErrors.city = "City is required";
} else if (!/^[A-Za-z ]+$/.test(formData.city)) {
  newErrors.city = "Only letters are allowed";
}

 if (!formData.state.trim()) {
  newErrors.state = "State is required";
} else if (!/^[A-Za-z ]+$/.test(formData.state)) {
  newErrors.state = "Only letters are allowed";
}

  if (!formData.pincode.trim()) {
  newErrors.pincode = "Pincode is required";
} else if (!/^[0-9]{6}$/.test(formData.pincode)) {
  newErrors.pincode = "Pincode must be exactly 6 digits";
}

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

const handleProceed = () => {
  if (validateForm()) {
    localStorage.setItem("checkoutData", JSON.stringify(formData));
    router.push("/payment");
  }
};
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
    <Input
  name="fullName"
  placeholder="Enter your full name"
  value={formData.fullName}
  onChange={handleChange}
    className="bg-neutral-100" />

    {errors.fullName && (
  <p className="mt-1 text-sm text-red-500">
    {errors.fullName}
  </p>
)}
  </div>

  <div>
    <Label>Mobile Number</Label>
    <Input
  name="mobile"
  type="text"
  inputMode="numeric"
  maxLength={10}
  placeholder="Enter mobile number"
  value={formData.mobile}
  onChange={handleChange}
  className="bg-neutral-100"
/>
{errors.mobile && (
  <p className="mt-1 text-sm text-red-500">
    {errors.mobile}
  </p>
)}
  </div>

  <div>
    <Label>Email</Label>
    <Input
  name="email"
  type="email"
  placeholder="Enter your email"
  value={formData.email}
  onChange={handleChange}
  className="bg-neutral-100"
/>
{errors.email && (
  <p className="mt-1 text-sm text-red-500">
    {errors.email}
  </p>
)}
  </div>

  <div>
    <Label>Pincode</Label>
    <Input
  name="pincode"
  type="number"
  inputMode="numeric"
  maxLength={6}
  placeholder="Pincode"
  value={formData.pincode}
  onChange={handleChange}
  className="bg-neutral-100"
/>
{errors.pincode && (
  <p className="mt-1 text-sm text-red-500">
    {errors.pincode}
  </p>
)}
  </div>

  <div className="md:col-span-2">
    <Label>Address</Label>
    <Input
  name="address"
  placeholder="House No., Street, Area"
  value={formData.address}
  onChange={handleChange}
  className="bg-neutral-100"
/>
{errors.address && (
  <p className="mt-1 text-sm text-red-500">
    {errors.address}
  </p>
)}
  </div>

  <div>
    <Label>City</Label>
    <Input
  name="city"
  placeholder="City"
  value={formData.city}
  onChange={handleChange}
  className="bg-neutral-100"
/>
{errors.city && (
  <p className="mt-1 text-sm text-red-500">
    {errors.city}
  </p>
)}
  </div>

  <div>
    <Label>State</Label>
    <Input
  name="state"
  placeholder="State"
  value={formData.state}
  onChange={handleChange}
  className="bg-neutral-100"
/>
{errors.state && (
  <p className="mt-1 text-sm text-red-500">
    {errors.state}
  </p>
)}
  </div>

  <div className="md:col-span-2">
    <Label>Landmark (Optional)</Label>
    <Input
  name="landmark"
  placeholder="Near School, Hospital..."
  value={formData.landmark}
  onChange={handleChange}
  className="bg-neutral-100"
/>
{errors.landmark && (
  <p className="mt-1 text-sm text-red-500">
    {errors.landmark}
  </p>
)}
  </div>



<div className="mt-6 flex justify-end">

 <button
  type="button"
  onClick={handleProceed}
  className="w-45 rounded-xl bg-amber-500 py-4 font-semibold text-white hover:bg-amber-600"
>
  Proceed to Payment
</button>

</div>

</div>

</div>

</div>
</div>
      
    </>
  );
}