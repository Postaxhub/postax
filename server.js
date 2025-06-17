const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
require("dotenv").config(); // if using .env

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "form_postax"
});

db.connect((err) => {
  if (err) {
    console.error("DB connection failed:", err);
    return;
  }
  console.log("✅ Connected to DB");
});

app.post("/contact", (req, res) => {
  const { name, email, subject, message } = req.body;

  const sql = "INSERT INTO contact_form (name, email, subject, message) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, email, subject, message], (err, result) => {
    if (err) {
      console.error("Insert error:", err);
      return res.status(500).json({ message: "Server error" });
    }
    res.json({ message: "Thank you! We'll contact you soon." });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
