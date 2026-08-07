"use client";

import {useEffect,useState} from "react";
import Navbar from "@/components/customer/Navbar";


export default function OrdersPage(){

const [orders,setOrders]=useState<any[]>([]);


useEffect(()=>{

fetch("/api/orders/user/1")
.then(res=>res.json())
.then(data=>setOrders(data));

},[]);



return (

<>
<Navbar
  showSearch={true}
  showCart={true}
/>


<div className="max-w-5xl mx-auto px-6 py-10">


<h1 className="text-4xl font-bold text-amber-500 mb-8">
My Orders
</h1>


<div className="space-y-6">


{
orders.map((order)=>(
<div
key={order.id}
className="bg-white rounded-xl shadow p-6"
>

<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

  <div>
    <h2 className="text-2xl font-bold text-slate-900">
      Order #{order.id}
    </h2>

    <p className="mt-1 text-sm text-gray-500">
      Placed on{" "}
      {new Date(order.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })}
    </p>
  </div>

  <div className="text-right">

    <span
      className={`inline-block rounded-full px-4 py-1 text-sm font-semibold
      ${
        order.status === "DELIVERED"
          ? "bg-green-100 text-green-700"
          : order.status === "PENDING"
          ? "bg-yellow-100 text-yellow-700"
          : order.status === "SHIPPED"
          ? "bg-blue-100 text-blue-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {order.status}
    </span>

    <p className="mt-2 text-sm text-gray-600">
      Payment: <span className="font-medium">{order.paymentMethod}</span>
    </p>

  </div>

</div>

<div className="mt-6 space-y-4">

{order.items?.map((item:any)=>(

<div
key={item.id}
className="flex gap-5 border-b pb-5"
>

<img
  src={item.product.image}
  alt={item.product.name}
  className="w-24 h-24 rounded-xl object-cover border"
/>
<div className="flex-1">

<h3 className="text-lg font-semibold text-slate-900">
{item.product.name}
</h3>

<p className="text-gray-500 mt-1">
Quantity : {item.quantity}
</p>

<p className="text-amber-500 font-bold text-lg mt-2">
₹ {item.product.price * item.quantity}
</p>

</div>

</div>

))}


</div>



</div>

))

}


</div>


</div>


</>

)

}