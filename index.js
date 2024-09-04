const express = require('express');
const mongoose = require('mongoose');
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
const assignement=require('./routes/assignement_route')
const attachement=require('./routes/attachement_route')
const instructor=require('./routes/instructor_route')
const member=require('./routes/member_route')
const super_admin=require('./routes/super_admin_route')
const response=require('./routes/response_route')
const session=require('./routes/session_route')
app.use('/assignement',assignement)
app.use('/attachement',attachement)
app.use('/instructor',instructor)
app.use('/member',member)
app.use('/super_admin',super_admin)
app.use('/response',response)
app.use('/session',session)
async function startServer() {
    try {
        await mongoose.connect(url, {
        });
        console.log("Connected successfully with the database");

        app.listen(PORT, () => {
            console.log(`The server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

startServer();