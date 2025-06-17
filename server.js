const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", 
  database: "form_postax" 
});

db.connect(err => {
  if (err) {
    console.error("❌ Database connection failed:", err.stack);
    return;
  }
  console.log("✅ Connected to MySQL database.");
});


app.post("/contact", (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const sql = "INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, email, subject, message], (err, result) => {
    if (err) {
      console.error("❌ Failed to insert:", err);
      return res.status(500).json({ message: "Database error" });
    }

    console.log("✅ Data inserted:", result);
   res.json({ 
  message: "Thank you for reaching out! 🎉 Our team will get in touch with you within 24 hours. Stay tuned — exciting things ahead! 🚀" 
});

  });
});


app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
