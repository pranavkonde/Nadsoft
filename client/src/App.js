import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import axios from "axios";

function App() {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/students?page=${page}&limit=10`);
      setStudents(response.data.students);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [page]);

  const handleAddStudentClick = () => {
    setSelectedStudent(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedStudent(null);
  };

  return (
    <div className='container'>
      <h1 className='my-4'>Student Management System</h1>
      <Button variant='primary' onClick={handleAddStudentClick}>
        Add Student
      </Button>
      <hr />
      <StudentList
        students={students}
        page={page}
        totalPages={totalPages}
        setPage={setPage}
        fetchStudents={fetchStudents}
        onEdit={(student) => {
          setSelectedStudent(student);
          setShowModal(true);
        }}
      />
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedStudent ? "Edit Student" : "Add Student"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StudentForm
            fetchStudents={fetchStudents}
            selectedStudent={selectedStudent}
            clearSelectedStudent={handleCloseModal}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default App;
