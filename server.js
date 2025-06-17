
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2"); 

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// DB connection
const db = mysql.createConnection({
  host: "localhost",
  user: "",
  password: "",
  database: "form_postax",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection error:", err);
    return;
  }
  console.log("Connected to DB");
});


app.post("/api/contact", (req, res) => {
  const { name, email, subject, message } = req.body;

  const sql = "INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, email, subject, message], (err, result) => {
    if (err) {
      console.error("DB insert error:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    res.json({ message: "Message received! We'll get back to you soon." });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
