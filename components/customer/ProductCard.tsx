import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

type ProductCardProps = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export default function ProductCard({
  id,
  name,
  price,
  image,
}: ProductCardProps) {
  return (
    <div className="group bg-white rounded-2xl shadow-md overflow-hidden border border-slate-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

      <Image
        src={image}
        alt={name}
        width={300}
        height={250}
        className="h-56 w-full object-cover transition duration-500 group-hover:scale-110"
      />

      <div className="p-4">

        <h2 className="text-lg font-semibold text-slate-800">
          {name}
        </h2>
        <div className="flex items-center mt-2 mb-2">
  {[1, 2, 3, 4, 5].map((star) => (
    <Star
      key={star}
      size={16}
      className="fill-amber-400 text-amber-400"
    />
  ))}

  <span className="ml-2 text-sm text-slate-500">
    (4.9)
  </span>
</div>

        <p className="text-2xl font-bold text-amber-600">
          ₹ {price}
        </p>

        <Link
          href={`/product/${id}`}
          className="mt-5 inline-block w-full rounded-xl bg-amber-500 py-3 text-center font-semibold text-white transition-all duration-300 hover:bg-amber-600 hover:shadow-lg"
        >
          View Details
        </Link>

      </div>
    </div>
  );
}