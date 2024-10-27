const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors middleware
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
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swaggerConfig');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Enable CORS for requests from http://localhost:3000
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error.message);
  });

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

// Start server
app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
