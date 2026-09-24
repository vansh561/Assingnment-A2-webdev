// Mock data - in-memory student storage
let students = [
  {
    id: 1,
    name: "Rahul",
    course: "BCA"
  },
  {
    id: 2,
    name: "Priya",
    course: "BTech"
  },
  {
    id: 3,
    name: "Amit",
    course: "BCA"
  }
];

// Counter for auto-incrementing IDs
let nextId = 4;

module.exports = {
  getAllStudents: () => students,
  
  getStudentById: (id) => {
    return students.find(student => student.id === parseInt(id));
  },
  
  addStudent: (name, course) => {
    const newStudent = {
      id: nextId++,
      name,
      course
    };
    students.push(newStudent);
    return newStudent;
  },
  
  updateStudent: (id, name, course) => {
    const student = students.find(s => s.id === parseInt(id));
    if (student) {
      student.name = name || student.name;
      student.course = course || student.course;
      return student;
    }
    return null;
  },
  
  deleteStudent: (id) => {
    const index = students.findIndex(s => s.id === parseInt(id));
    if (index !== -1) {
      const deleted = students[index];
      students.splice(index, 1);
      return deleted;
    }
    return null;
  }
};