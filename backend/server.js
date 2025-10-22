// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import nodemailer from "nodemailer";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// const PORT = process.env.PORT || 5000;

// // ✅ Nodemailer transporter
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // Test route
// app.get("/", (req, res) => {
//   res.send("Backend is running");
// });

// // Send order email
// app.post("/send-order-email", async (req, res) => {
//   const { name, email, phone, address, orderId, totalAmount, orderItems } = req.body;

//   try {
//     // Build HTML table for order items
//     const itemsHtml = orderItems.map(
//       (item) => `
//       <tr>
//         <td style="padding: 8px; border: 1px solid #ddd;">${item.name}</td>
//         <td style="padding: 8px; border: 1px solid #ddd; text-align:center;">${item.quantity}</td>
//         <td style="padding: 8px; border: 1px solid #ddd; text-align:right;">$${item.price.toFixed(2)}</td>
//       </tr>`
//     ).join("");

//     const htmlContent = `
//       <div style="font-family: Arial, sans-serif; color: #333;">
//         <h2 style="color: #FF6600;">FoodHub Order Confirmation</h2>
//         <p>Hi <strong>${name}</strong>,</p>
//         <p>Thank you for your order! Your order <strong>#${orderId}</strong> has been received and is being processed.</p>

//         <h3>Order Details:</h3>
//         <table style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
//           <thead>
//             <tr>
//               <th style="padding: 8px; border: 1px solid #ddd;">Item</th>
//               <th style="padding: 8px; border: 1px solid #ddd;">Qty</th>
//               <th style="padding: 8px; border: 1px solid #ddd;">Price</th>
//             </tr>
//           </thead>
//           <tbody>
//             ${itemsHtml}
//           </tbody>
//         </table>

//         <p><strong>Total Amount:</strong> $${totalAmount.toFixed(2)}</p>
//         <p><strong>Payment Status:</strong> Completed</p>

//         <h3>Delivery Details:</h3>
//         <p>
//           <strong>Name:</strong> ${name} <br/>
//           <strong>Phone:</strong> ${phone} <br/>
//           <strong>Address:</strong> ${address}
//         </p>

//         <p style="margin-top: 30px;">We appreciate your business and hope you enjoy your meal!</p>
//         <p style="color: #888;">FoodHub Team</p>
//       </div>
//     `;

//     const info = await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: `FoodHub Order Confirmation #${orderId}`,
//       html: htmlContent,
//     });

//     console.log("Email sent:", info.response);
//     res.status(200).json({ message: "Email sent successfully" });
//   } catch (err) {
//     console.error("Error sending email:", err);
//     res.status(500).json({ error: "Failed to send email", details: err.message });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });









import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Razorpay from "razorpay";
import nodemailer from "nodemailer";
import QRCode from "qrcode";
import PDFDocument from "pdfkit";
import streamBuffers from "stream-buffers";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Razorpay instance (Key Secret kept safe here)
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Test route
app.get("/", (req, res) => res.send("Backend is running"));

// 1️⃣ Create Razorpay order
app.post("/create-order", async (req, res) => {
  try {
    const { amount, currency = "INR" } = req.body;
    const options = {
      amount: Math.round(amount * 100), // in paise
      currency,
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create Razorpay order" });
  }
});

// 2️⃣ Send order confirmation email with PDF
app.post("/send-order-email", async (req, res) => {
  const { name, email, phone, address, orderId, totalAmount, orderItems } = req.body;

  try {
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const pdfBuffer = new streamBuffers.WritableStreamBuffer();
    doc.pipe(pdfBuffer);

    // Header
    doc.fillColor("#FF6600").fontSize(20).text("FoodHub", { align: "center" })
       .moveDown(0.2)
       .fontSize(14).text("Order Confirmation Receipt", { align: "center" }).moveDown(1);

    // Customer Details
    doc.fillColor("black").fontSize(12)
       .text(`Customer Name: ${name}`)
       .text(`Email: ${email}`)
       .text(`Phone: ${phone}`)
       .text(`Delivery Address: ${address}`)
       .moveDown(1);

    // Order Summary
    doc.fontSize(12).text(`Order #${orderId}`, { underline: true }).moveDown(0.5);
    doc.text("Item", 50, doc.y, { continued: true });
    doc.text("Qty", 300, doc.y, { continued: true });
    doc.text("Price", 400, doc.y).moveDown(0.5);

    orderItems.forEach((item) => {
      doc.text(item.name, 50, doc.y, { continued: true });
      doc.text(item.quantity.toString(), 300, doc.y, { continued: true });
      doc.text(`$${item.price.toFixed(2)}`, 400, doc.y);
      doc.moveDown(0.2);
    });

    doc.moveDown(1);
    doc.text(`Total Amount: $${totalAmount.toFixed(2)}`, { align: "right" });
    doc.text(`Payment Status: Completed`, { align: "right" });

    const orderLink = `https://yourfoodhub.com/orders/${orderId}`;
    const qrCodeDataUrl = await QRCode.toDataURL(orderLink);
    doc.image(qrCodeDataUrl, 50, doc.y + 20, { width: 100, height: 100 });
    doc.text("Scan QR to view your order online", 160, doc.y + 60);

    doc.moveDown(6).fillColor("#FF6600").fontSize(12)
       .text("Thank you for choosing FoodHub!", { align: "center" })
       .text("We hope you enjoy your meal 🍽️", { align: "center" });

    doc.end();
    const pdfBufferFinal = pdfBuffer.getContents();

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `FoodHub Order Confirmation #${orderId}`,
      html: `<h2 style="color:#FF6600;">Hi ${name},</h2>
             <p>Your order <strong>#${orderId}</strong> totaling <strong>$${totalAmount.toFixed(2)}</strong> has been received.</p>
             <p>Attached is your detailed receipt PDF for your reference.</p>
             <p>Thank you for ordering from <strong>FoodHub</strong>!</p>`,
      attachments: [
        {
          filename: `FoodHub_Order_${orderId}.pdf`,
          content: pdfBufferFinal,
          contentType: "application/pdf",
        },
      ],
    });

    console.log("Email sent:", info.response);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({ error: "Failed to send email", details: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
