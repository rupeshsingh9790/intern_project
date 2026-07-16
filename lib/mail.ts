import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendStatusMail(
  email: string,
  name: string,
  mobile: string,
  role: string,
  status: boolean
) {
   console.log("Sending email to:", email);
  const info = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,

    subject: "Account Status Updated",

    html: `
      <div style="font-family:Arial,sans-serif;padding:20px">

      <h2>Hello ${name},</h2>

      <p>Your account status has been updated by the Admin.</p>

      <table border="1" cellpadding="8" cellspacing="0">
        <tr>
          <td><b>Name</b></td>
          <td>${name}</td>
        </tr>

        <tr>
          <td><b>Email</b></td>
          <td>${email}</td>
        </tr>

        <tr>
          <td><b>Mobile</b></td>
          <td>${mobile}</td>
        </tr>

        <tr>
          <td><b>Role</b></td>
          <td>${role}</td>
        </tr>

        <tr>
          <td><b>Status</b></td>
          <td>${status ? "🟢 Active" : "🔴 Inactive"}</td>
        </tr>
      </table>

      <br/>

      <p>Thank you.</p>

      <p><b>Admin Team</b></p>

      </div>
    `,
  });
  console.log("Email sent successfully:", info.response);
}