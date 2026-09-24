const express = require('express');
const logger = require('./Middleware/logger');
const studentRoutes = require('./Routes/studentRoutes');

// Initialize Express app
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(logger); // Custom logger middleware

// Routes
app.use('/students', studentRoutes);

// Home route
app.get('/', (req, res) => {
  res.status(200).json({
    message: "Welcome to Student Management REST API",
    endpoints: {
      "GET /students": "Get all students",
      "GET /students/:id": "Get student by ID",
      "POST /students": "Create new student",
      "PUT /students/:id": "Update student",
      "DELETE /students/:id": "Delete student"
    }
  });
});

// 404 - Not Found error handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Visit http://localhost:${PORT} for API documentation`);
});