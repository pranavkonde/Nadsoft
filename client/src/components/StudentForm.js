import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const StudentForm = ({ fetchStudents, selectedStudent, clearSelectedStudent }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (selectedStudent) {
      setName(selectedStudent.name);
      setEmail(selectedStudent.email);
    } else {
      setName("");
      setEmail("");
    }
  }, [selectedStudent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedStudent) {
        await axios.put(`http://localhost:5000/students/${selectedStudent.id}`, { name, email });
        Swal.fire("Success", "Student updated successfully", "success");
      } else {
        await axios.post("http://localhost:5000/students", { name, email });
        Swal.fire("Success", "Student added successfully", "success");
      }
      setName("");
      setEmail("");
      fetchStudents();
      clearSelectedStudent();
    } catch (error) {
      Swal.fire("Error", "There was an error processing the request", "error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='mb-3'>
        <label className='form-label'>Name</label>
        <input type='text' className='form-control' value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className='mb-3'>
        <label className='form-label'>Email</label>
        <input
          type='email'
          className='form-control'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button type='submit' className='btn btn-primary'>
        {selectedStudent ? "Update Student" : "Add Student"}
      </button>
    </form>
  );
};

export default StudentForm;
