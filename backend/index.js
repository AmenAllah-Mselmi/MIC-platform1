const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Instructor = require('./routes/instructor_route');
const Department = require('./routes/department_route');
const Member = require('./routes/member_route');
const Super_admin = require('./routes/super_admin_route');
const assignment = require('./routes/assignment_route');
const session = require('./routes/session_route');
const dotenv = require('dotenv');
const response = require('./routes/response_route');
const attachment = require('./routes/attachment_route');
const user = require('./routes/user_route');

dotenv.config();

// Swagger setup
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swaggerConfig');

const app = express();
const PORT = process.env.PORT || 8080;

// CORS middleware
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from localhost:3000
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // If you're using cookies/sessions
}));

// Increase the payload size limit
app.use(express.json({ limit: '50mb' })); // Allow larger JSON payloads
app.use(express.urlencoded({ extended: true, limit: '50mb' })); // Allow larger form data payloads

// Swagger docs route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Connect to MongoDB
const url = process.env.MONGODB_URL;
mongoose.connect(url)
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error.message);
  });

// Routes
app.use('/api/instructor', Instructor);
app.use('/api/member', Member);
app.use('/api/super_admin', Super_admin);
app.use('/api/session', session);
app.use('/api/assignment', assignment);
app.use('/api/attachment', attachment);
app.use('/api/response', response);
app.use('/api/user', user);
app.use('/api/department', Department);

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  next()
})

app.use('/api/instructor', Instructor)
app.use('/api/member', Member)
app.use('/api/super_admin', Super_admin)
app.use('/api/session', session)
app.use('/api/assignment', assignment)
app.use('/api/attachment', attachment)
app.use('/api/response', response)
app.use('/api/user', user)
app.use('/api/department', Department)

// Start server
app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
