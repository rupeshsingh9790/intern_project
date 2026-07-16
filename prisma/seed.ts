import prisma from "../lib/prisma";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
const images = [
  "/products/watch.jpg",
  "/products/phone.jpg",
  "/products/laptop.jpg",
  "/products/headphone.jpg",
  "/products/keyboard.jpg",
  "/products/mouse.jpg",
  "/products/helmet.jpg",
  "/products/gloves.jpg",
  "/products/camera.jpg",
  "/products/glasses.jpg",
];
async function main() {
  console.log("Deleting old data...");

  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  console.log("Creating Admin...");

  const adminPassword = await bcrypt.hash("admin123", 10);

  await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@gmail.com",
      mobile: "9999999999",
      password: adminPassword,
      role: "ADMIN",
      isActive: true,
    },
  });

  console.log("Creating Users...");

  const userPassword = await bcrypt.hash("123456", 10);

  for (let i = 0; i < 10; i++) {
    await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        mobile: faker.string.numeric(10),
        password: userPassword,
        role: "USER",
        isActive: true,
      },
    });
  }

  console.log("Creating Products...");

  const users = await prisma.user.findMany({
    where: {
      role: "USER",
    },
  });

  for (let i = 0; i < 30; i++) {
   const randomUser =
  users[Math.floor(Math.random() * users.length)];

const randomImage =
  images[Math.floor(Math.random() * images.length)];

await prisma.product.create({
  data: {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: Number(faker.commerce.price()),
    image: randomImage,
    userId: randomUser.id,
  },
});
  }

  console.log("✅ Database Seeded Successfully");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });