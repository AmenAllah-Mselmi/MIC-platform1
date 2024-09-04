import express from 'express';
import mongoose from 'mongoose';
// import assignement from './routes/assignement_route.js';
// import attachement from './routes/attachement_route.js';
import Instructor from './routes/instructor_route.js';
import Member from './routes/member_route.js';
import Super_admin from './routes/super_admin_route.js';
// import response from './routes/response_route.js';
// import session from './routes/session_route.js';

const app = express();
const PORT = process.env.PORT || 8080;

const url = "mongodb://localhost:27017/MIC";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// app.use('/assignement', assignement);
// app.use('/attachement', attachement);
app.use('/instructor', Instructor);
app.use('/member', Member);
app.use('/super_admin', Super_admin);
// app.use('/response', response);
// app.use('/session', session);

async function startServer() {
    try {
        await mongoose.connect(url);
        console.log("Connected successfully with the database");

        app.listen(PORT, () => {
            console.log(`The server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

startServer();