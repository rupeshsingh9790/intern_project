import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendOrderEmail(
  email: string,
  name: string
) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Order Confirmation - VASTRA",
    html: `
      <h2>Order Placed Successfully 🎉</h2>

      <p>Hello <b>${name}</b>,</p>

      <p>
        Thank you for shopping with <b>VASTRA STORE</b>.
      </p>

      <p>
        Your order has been placed successfully.
      </p>

      <p>
        We will notify you once your order is confirmed.
      </p>

      <br>

      <p>Regards,</p>

      <h3>VASTRA Team</h3>
    `,
  });
}