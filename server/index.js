const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // for parsing application/json

// Create a new student record
app.post("/students", async (req, res) => {
  const { name, email } = req.body;
  try {
    const newStudent = await pool.query("INSERT INTO students (name, email) VALUES ($1, $2) RETURNING *", [
      name,
      email,
    ]);
    res.json(newStudent.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Retrieve a list of all students with pagination
app.get("/students", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const totalRecords = await pool.query("SELECT COUNT(*) FROM students");
    const students = await pool.query("SELECT * FROM students ORDER BY id LIMIT $1 OFFSET $2", [limit, offset]);

    res.json({
      totalRecords: totalRecords.rows[0].count,
      totalPages: Math.ceil(totalRecords.rows[0].count / limit),
      currentPage: page,
      students: students.rows,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Retrieve a single student by ID with marks
app.get("/students/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const student = await pool.query("SELECT * FROM students WHERE id = $1", [id]);
    const marks = await pool.query("SELECT * FROM marks WHERE student_id = $1", [id]);
    res.json({ student: student.rows[0], marks: marks.rows });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Update a student's information
app.put("/students/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    await pool.query("UPDATE students SET name = $1, email = $2 WHERE id = $3", [name, email, id]);
    res.send("Student updated successfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Delete a student record
app.delete("/students/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM students WHERE id = $1", [id]);
    res.send("Student deleted successfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
