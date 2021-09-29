
import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
// import RegisterRoute from './Routes/register-route.js';
import cors from 'cors';

// dot_env config
dotenv.config()

const app = express()
const server = http.createServer(app)
const PORT = 8080

// middleware
app.use(cors({
    origin: ['http://localhost:8081']
  }));

// allows json entry and dispatch upto 50mb
app.use(express.json({limit: '50mb'}))

// api endpoints
// app.use('/register',RegisterRoute)

// db-connection

// server listener
server.listen(PORT, ()=>{
    console.log('Listening to localhost:8080')
})

// need to provide auth key for accessing the api endpoints for security and removing password sending even if hashed to react.js. Refactoring the code for more optimizations.