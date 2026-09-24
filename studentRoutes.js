const express = require('express');
const router = express.Router();
const studentData = require('../Data/student');

// GET /students - Get all students
router.get('/', (req, res) => {
  try {
    const students = studentData.getAllStudents();
    res.status(200).json({
      success: true,
      message: "All students retrieved successfully",
      data: students
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
});

// GET /students/:id - Get student by ID
router.get('/:id', (req, res) => {
  try {
    const student = studentData.getStudentById(req.params.id);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }
    
    res.status(200).json({
      success: true,
      message: "Student retrieved successfully",
      data: student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
});

// POST /students - Create new student
router.post('/', (req, res) => {
  try {
    const { name, course } = req.body;
    
    // Validation
    if (!name || !course) {
      return res.status(400).json({
        success: false,
        message: "Name and Course are required"
      });
    }
    
    const newStudent = studentData.addStudent(name, course);
    
    res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: newStudent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
});

// PUT /students/:id - Update student
router.put('/:id', (req, res) => {
  try {
    const { name, course } = req.body;
    const id = req.params.id;
    
    // Check if student exists
    if (!studentData.getStudentById(id)) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }
    
    // Validation - at least one field should be provided
    if (!name && !course) {
      return res.status(400).json({
        success: false,
        message: "At least one field (name or course) is required to update"
      });
    }
    
    const updatedStudent = studentData.updateStudent(id, name, course);
    
    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: updatedStudent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
});

// DELETE /students/:id - Delete student
router.delete('/:id', (req, res) => {
  try {
    const id = req.params.id;
    
    const deletedStudent = studentData.deleteStudent(id);
    
    if (!deletedStudent) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }
    
    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
      data: deletedStudent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
});

module.exports = router;