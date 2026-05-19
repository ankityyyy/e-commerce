import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOrderEmail = async (userEmail, order) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: userEmail,
    subject: "Order Confirmed",
    html: `
      <h2>Order Confirmed</h2>
      <p>Order ID: ${order._id}</p>
      <p>Total: ₹${order.totalAmount}</p>
    `,
  });
};