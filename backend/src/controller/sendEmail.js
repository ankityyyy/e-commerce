import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOrderEmail = async (userEmail, order) => {

  const itemsHtml = order.items
    .map(
      (item) => `
      <tr>
        <td style="padding:10px;border:1px solid #ddd;">
          ${item.title}
        </td>

        <td style="padding:10px;border:1px solid #ddd;text-align:center;">
          ${item.quantity}
        </td>

        <td style="padding:10px;border:1px solid #ddd;text-align:center;">
          ₹${item.price}
        </td>

        <td style="padding:10px;border:1px solid #ddd;text-align:center;">
          ₹${item.price * item.quantity}
        </td>
      </tr>
    `
    )
    .join("");

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: userEmail,
    subject: "Payment Successful - Order Confirmed",

    html: `
      <div style="font-family:Arial,sans-serif;padding:20px;background:#f4f4f4;">

        <div style="max-width:700px;margin:auto;background:white;padding:30px;border-radius:10px;">

          <h1 style="color:green;text-align:center;">
            Payment Successful ✅
          </h1>

          <p style="font-size:16px;">
            Thank you for your order.
          </p>

          <hr/>

          <h2>Order Details</h2>

          <p>
            <strong>Order ID:</strong> ${order._id}
          </p>

          <p>
            <strong>Payment Status:</strong> ${order.paymentStatus}
          </p>

          <p>
            <strong>Order Status:</strong> ${order.orderStatus}
          </p>

          <p>
            <strong>Total Amount:</strong> ₹${order.totalAmount}
          </p>

          <hr/>

          <h2>Shipping Address</h2>

          <p>
            ${order.shippingAddress.fullName}<br/>
            ${order.shippingAddress.street}<br/>
            ${order.shippingAddress.city},
            ${order.shippingAddress.state}<br/>
            ${order.shippingAddress.country} - ${order.shippingAddress.pincode}<br/>
            Phone: ${order.shippingAddress.phone}
          </p>

          <hr/>

          <h2>Ordered Items</h2>

          <table style="width:100%;border-collapse:collapse;">

            <thead>
              <tr style="background:#000;color:#fff;">

                <th style="padding:10px;border:1px solid #ddd;">
                  Product
                </th>

                <th style="padding:10px;border:1px solid #ddd;">
                  Qty
                </th>

                <th style="padding:10px;border:1px solid #ddd;">
                  Price
                </th>

                <th style="padding:10px;border:1px solid #ddd;">
                  Total
                </th>

              </tr>
            </thead>

            <tbody>
              ${itemsHtml}
            </tbody>

          </table>

          <br/>

          <div style="text-align:right;font-size:20px;">
            <strong>
              Grand Total: ₹${order.totalAmount}
            </strong>
          </div>

          <br/>

          <p style="color:#666;">
            For any order related queries please contact support.
          </p>

        </div>

      </div>
    `,
  });
};