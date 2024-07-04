import React from "react";
import Swal from "sweetalert2";
import axios from "axios";

const StudentList = ({ students, page, totalPages, setPage, fetchStudents, onEdit }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/students/${id}`);
      Swal.fire("Success", "Student deleted successfully", "success");
      fetchStudents();
    } catch (error) {
      Swal.fire("Error", "There was an error deleting the student", "error");
    }
  };

  return (
    <div>
      <ul className='list-group mb-3'>
        {students.map((student) => (
          <li key={student.id} className='list-group-item d-flex justify-content-between align-items-center'>
            {student.name} - {student.email}
            <div>
              <button className='btn btn-info btn-sm me-2' onClick={() => onEdit(student)}>
                Edit
              </button>
              <button className='btn btn-danger btn-sm' onClick={() => handleDelete(student.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <nav>
        <ul className='pagination'>
          {[...Array(totalPages)].map((_, index) => (
            <li key={index} className={`page-item ${page === index + 1 ? "active" : ""}`}>
              <button className='page-link' onClick={() => setPage(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default StudentList;
