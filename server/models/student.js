const { Pool } = require("pg");

class Student {
  constructor() {
    this.pool = new Pool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });
  }

  // Method to add a new student
  async create(name, email, marks) {
    const result = await this.pool.query(
      "INSERT INTO students (name, email, marks) VALUES ($1, $2, $3) RETURNING *",
      [name, email, marks]
    );
    return result.rows[0];
  }

  // Method to retrieve all students with pagination
  async getAllStudents(page, limit) {
    const offset = (page - 1) * limit;
    const result = await this.pool.query(
      "SELECT * FROM students ORDER BY id LIMIT $1 OFFSET $2",
      [limit, offset]
    );
    return result.rows;
  }

  // Method to retrieve a single student by ID
  async getById(id) {
    const result = await this.pool.query(
      "SELECT * FROM students WHERE id = $1",
      [id]
    );
    return result.rows[0];
  }

  // Method to update a student's information
  async update(id, name, email, marks) {
    const result = await this.pool.query(
      "UPDATE students SET name = $1, email = $2, marks = $3 WHERE id = $4 RETURNING *",
      [name, email, marks, id]
    );
    return result.rows[0];
  }

  // Method to delete a student record
  async delete(id) {
    const result = await this.pool.query("DELETE FROM students WHERE id = $1", [
      id,
    ]);
    return result.rowCount > 0;
  }

  // Method to get the total count of students
  async getTotalCount() {
    const result = await this.pool.query("SELECT COUNT(*) FROM students");
    return result.rows[0].count;
  }
}

module.exports = new Student();
