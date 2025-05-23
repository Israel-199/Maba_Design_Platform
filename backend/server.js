import express from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
dotenv.config();
import cookieParser from "cookie-parser";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import receiptRoutes from "./routes/receiptRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const port = process.env.PORT || 8000;

connectDB();

const app = express();

// Middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/send", receiptRoutes);

// Serve uploads statically
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
<<<<<<< HEAD
  app.use("/uploads", express.static("/var/data/uploads"));
=======
  const __dirname = path.resolve();
  app.use("/uploads", express.static("/var/data/uploads"));
  app.use(express.static(path.join(__dirname, "/frontend/build")));
>>>>>>> 734b06d (updated)

  const frontendPath = path.resolve(__dirname, "frontend", "build");
  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
} else {
  const __dirname = path.resolve();
  app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

<<<<<<< HEAD

=======
// Error handling
>>>>>>> 734b06d (updated)
app.use(notFound);
app.use(errorHandler);

// Server start
app.listen(port, () => {
  console.log(`server running on ${port}...`);
});
