const path = require('path');
const express = require('express');
const mongoose = require('mongoose')
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 8080;

connectDB();

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/todos', require('./routes/todoRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// app.use('/api/auth', authRoutes)
// app.use('/api/todos', todoRoutes) // todoRoutes icindeki her route'a burdan gidiyor

// Serve frontend //
// if (process.env.NODE_ENV === 'production') {
//     // app.use(express.static(path.join(__dirname, '../frontend/build')));
//     app.use(express.static('frontend/build'));

//     app.get('*', (req, res) =>
//         res.sendFile(
//             path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
//         )
//     );
// } else {
//     app.get('/', (req, res) => res.send('Please set to production'));
// }
// app.use(express.static(path.join(__dirname, "/frontend/build")));

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '/frontend/build', 'index.html'));
// });

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`))
// app.listen(process.env.PORT || 8080, () => console.log(`Server started on port ${port}`))