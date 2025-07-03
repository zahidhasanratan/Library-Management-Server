import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bookRoutes from "./routes/book.route";
import borrowRoutes from "./routes/borrow.route";

dotenv.config();
const app = express();

// ✅ List of allowed frontend domains
const allowedOrigins = [
  "http://localhost:5173", // for local development
  "https://magenta-semolina-d5b4b9.netlify.app", // e.g., Vercel/Netlify domain
  //   "https://another-allowed-domain.com", // add more as needed
];

// ✅ Configure CORS to allow multiple origins
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // optional if you use cookies/auth headers
  })
);

app.use(express.json());

app.use("/api/books", bookRoutes);
app.use("/api/borrows", borrowRoutes);

export default app;
