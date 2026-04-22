import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import nodemailer from "nodemailer";

import authRouter from "./routes/auth.routes.js";
import productRouter from "./routes/product.routes.js";
import cartRouter from "./routes/cart.routes.js";
import orderRouter from "./routes/order.routes.js";
import favoriteRouter from "./routes/favorite.routes.js";
import paypalRouter from "./routes/paypal.routes.js";
import notifyRouter from "./routes/notify.routes.js";
import quoteRouter from "./routes/quote.routes.js";
import profileRouter from "./routes/profile.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use("/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/user/cart", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/user/favorites", favoriteRouter);
app.use("/api/quotes", quoteRouter);
app.use("/api/paypal", paypalRouter);
app.use("/api", notifyRouter);
app.use("/api/profile", profileRouter);
app.post("/send-email", async (req, res) => {
  const { name, email, phone, company, subject, message } = req.body;

  // create transporter
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // use environment variable
      pass: process.env.EMAIL_PASS, // app password
    },
  });

  let mailOptions = {
    from: email,
    to: process.env.EMAIL_USER, // your receiving email
    subject: subject || `Message from ${name}`,
    text: `
    Name: ${name}
    Email: ${email}
    Phone: ${phone}
    Company: ${company}
    Message: ${message}
    `,
    html: `
    <p>New Message from Contact Form</p>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Company:</strong> ${company}</p>
    <p><strong>Message:</strong> ${message}</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, info });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error });
  }
});


export default app;
