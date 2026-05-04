import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import nodemailer from "nodemailer";
import helmet from "helmet";
import morgan from "morgan";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import xss from "xss-clean";
import hpp from "hpp";

import authRouter from "./routes/auth.routes.js";
import productRouter from "./routes/product.routes.js";
import cartRouter from "./routes/cart.routes.js";
import orderRouter from "./routes/order.routes.js";
import favoriteRouter from "./routes/favorite.routes.js";
import paypalRouter from "./routes/paypal.routes.js";
import notifyRouter from "./routes/notify.routes.js";
import quoteRouter from "./routes/quote.routes.js";
import profileRouter from "./routes/profile.routes.js";
import userRouter from "./routes/user.routes.js"

const app = express();

app.set("trust proxy", 1);
app.disable("x-powered-by");
app.disable("etag");

app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);
app.use(morgan("combined"));
app.use(
  cors({
    origin: function (origin, callback) {
      const allowed = [process.env.CLIENT_URL, process.env.CLIENT_URL_2];

      if (!origin || allowed.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(cookieParser());
app.use(express.json({ limit: "70mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(hpp());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

app.use("/api/auth", authRouter);
app.use("/api/user",userRouter)
app.use("/api/products", productRouter);
app.use("/api/user/cart", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/user/favorites", favoriteRouter);
app.use("/api/quotes", quoteRouter);
app.use("/api/paypal", paypalRouter);
app.use("/api", notifyRouter);
app.use("/api/profile", profileRouter);
app.post("/api/send-email", async (req, res) => {
  const { name, email, phone, company, subject, message } = req.body;

  // create transporter
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
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
