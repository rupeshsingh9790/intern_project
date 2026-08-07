import Navbar from "../../components/customer/Navbar";
import WishlistItem from "../../components/WishlistItem";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/getCurrentUser";

export default async function WishlistPage() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <>
        <Navbar showSearch={true} showCart={true} />

        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-3xl font-bold text-slate-800">
            Please login to view your wishlist
          </h1>
        </div>
      </>
    );
  }

  const wishlist = await prisma.wishlist.findMany({
    where: {
      userId: user.id,
    },
    include: {
      product: true,
    },
    orderBy: {
      id: "desc",
    },
  });

  return (
    <>
      <Navbar
        showSearch={true}
        showCart={true}
      />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold text-amber-500 mb-8">
          My Wishlist
        </h1>

        {wishlist.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            Your wishlist is empty.
          </div>
        ) : (
          <div className="space-y-6">
            {wishlist.map((item: any) => (
              <WishlistItem
                key={item.id}
                item={item}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}