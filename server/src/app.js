import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import nodemailer from "nodemailer";
import helmet from "helmet";
import morgan from "morgan";
import mongoSanitize from "express-mongo-sanitize";
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
import userRouter from "./routes/user.routes.js";
import contactRouter from "./routes/contact.routes.js";

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

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/products", productRouter);
app.use("/api/user/cart", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/user/favorites", favoriteRouter);
app.use("/api/quotes", quoteRouter);
app.use("/api/paypal", paypalRouter);
app.use("/api", notifyRouter);
app.use("/api/profile", profileRouter);
app.use("/api/contact", contactRouter);

export default app;
