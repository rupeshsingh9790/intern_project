import ProductDetails from "@/components/customer/ProductDetails";
import Navbar from "@/components/customer/Navbar";
import ProductCard from "@/components/customer/ProductCard";

async function getProduct(id: string) {
  const res = await fetch(
    `http://localhost:3000/api/products/${id}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
}

async function getRelatedProducts(id: string) {
  const res = await fetch(
    "http://localhost:3000/api/products",
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  return data.products
    .filter((item: any) => item.id !== Number(id))
    .slice(0, 8);
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

const product = await getProduct(id);
const relatedProducts = await getRelatedProducts(id);

return (
  <>
    <Navbar showSearch={true} showCart={true} />

    <div className="max-w-7xl mx-auto px-6 py-10">

      <ProductDetails product={product} />

      <div className="mt-20">

        <h2 className="text-3xl font-bold text-amber-500 mb-8">
          Related Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {relatedProducts.map((item: any) => (
            <ProductCard
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          ))}

        </div>

      </div>

    </div>
  </>
);
}