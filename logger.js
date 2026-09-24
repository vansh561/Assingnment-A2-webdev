// Custom Logger Middleware
const logger = (req, res, next) => {
  const timestamp = new Date().toLocaleString();
  const method = req.method;
  const url = req.url;
  
  console.log(`[${timestamp}] ${method} ${url}`);
  
  // Pass control to next middleware/route handler
  next();
};

module.exports = logger;