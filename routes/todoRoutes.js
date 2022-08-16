// import express from 'express';
// import { verifyToken } from '../middleware/authMiddleware.js';
// import { addTodo, completeTodo, deleteTodo, getSingleTodo, getTodos, updateTodo } from '../controllers/todoController.js';

// const router = express.Router();

const express = require('express')
const router = express.Router()
const {
    addTodo, completeTodo, deleteTodo, getSingleTodo, getTodos, updateTodo
} = require('../controllers/todoController')

const { verifyToken } = require('../middleware/authMiddleware')

router.post('/', verifyToken, addTodo)
router.put('/:id', verifyToken, updateTodo)
router.get('/complete/:id', verifyToken, completeTodo)
router.delete('/:id', verifyToken, deleteTodo)
router.get('/', verifyToken, getTodos)
router.get('/:id', verifyToken, getSingleTodo)

module.exports = router