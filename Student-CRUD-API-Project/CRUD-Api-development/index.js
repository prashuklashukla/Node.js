const express = require('express');
const connectDB = require('./config/database');
const auth = require('./middleware/auth');
const userRoutes = require('./routes/users.routes');
const studentRoutes = require('./routes/students.routes');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const path = require('path');
const multer = require('multer');

connectDB();

const app = express();
const PORT = process.env.PORT || 5500;

// Rate limiter middleware
const limiter = rateLimit({
  windowMs: 1000 * 60, // 1 minute
  max: 5,
  message: "Too many requests from this IP, please try again later.",
});

app.use(limiter);
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/students', studentRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});