const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const mentorRoutes = require("./routes/mentorRoutes");
const interviewRoutes = require("./routes/interviewRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// =========================
// MIDDLEWARE
// =========================

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith(".vercel.app") ||
        origin.endsWith(".netlify.app") ||
        origin.endsWith(".onrender.com") ||
        origin.includes("localhost")
      ) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "10mb" }));

// =========================
// ROUTES
// =========================

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/mentor", mentorRoutes);
app.use("/api/interview", interviewRoutes);

// =========================
// TEST ROUTES
// =========================

app.get("/", (req, res) => {
  res.send("SAARTHIX AI Backend is Running!");
});

app.get("/api/message", (req, res) => {
  res.json({
    message: "Welcome to SAARTHIX AI!",
  });
});

// =========================
// MONGODB CONNECTION
// =========================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((error) => {
    console.log("MongoDB connection failed:");
    console.log(error.message);
  });

// =========================
// START SERVER
// =========================

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});