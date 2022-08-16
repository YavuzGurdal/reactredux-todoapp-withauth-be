const path = require('path');
const express = require('express');
const mongoose = require('mongoose')
const colors = require('colors');
const dotenv = require('dotenv').config();
const cors = require('cors')
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 8080;

connectDB();

const app = express();

app.use(express.json())

app.use(cors({ credentials: true, origin: 'https://reactredux-todoapp-withauth-fe.netlify.app' })) // bunun sonunda / olmayacak

app.use(express.urlencoded({ extended: false }))

app.use('/api/todos', require('./routes/todoRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));



app.use(errorHandler);

// app.listen(port, () => console.log(`Server started on port ${port}`))
app.listen(process.env.PORT || 8080, () => console.log(`Server started on port ${port}`))