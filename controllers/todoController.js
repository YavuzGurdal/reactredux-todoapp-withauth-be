const asyncHandler = require('express-async-handler')

const Todo = require('../models/TodoModel')
const { createError } = require('../error');

// import asyncHandler from 'express-async-handler';
// import Todo from '../models/TodoModel.js';

// GET ALL TODOS
// @route GET /api/todos/
const getTodos = asyncHandler(async (req, res, next) => {
    try {
        const todos = await Todo.find({ userId: req.user.id })
        // find({ userId: req.params.id }) bu sekilde find icinde arama kriteri yazabiliyoruz

        res.status(200).json(todos)
    } catch (err) {
        next(err)
    }
})

// CREATE A TODO
// @route POST /api/todos/
const addTodo = asyncHandler(async (req, res, next) => {
    if (!req.body.todo) return next(createError(400, 'Please add a Todo'))

    const newTodo = new Todo({ userId: req.user.id, ...req.body })

    // Todo modeldekine gore userId'yi yukaridaki gibi ekliyorum. 
    // req.user.id 'daki id authMiddleware icindeki verifyToken'daki jwt.verify icinden gonderilen req.user icinden geliyor

    try {
        const savedTodo = await newTodo.save()

        res.status(200).json(savedTodo)
    } catch (err) {
        next(err)
    }
})

// UPDATE A TODO
// @route PUT /api/todos/:id
const updateTodo = asyncHandler(async (req, res, next) => {
    try {
        if (!req.body.todo) return next(createError(400, 'Please add a Todo'))

        const todo = await Todo.findById(req.params.id)
        // req.params.id 'daki id router.put('/:id', verifyToken, updateTodo)'daki id'den geliyor

        if (!todo) return next(createError(404, 'Todo not found!'))
        if (req.user.id === todo.userId) {
            // req.user.id 'daki id authMiddleware icindeki verifyToken'daki jwt.verify icinden gonderilen req.user icinden geliyor

            const updatedTodo = await Todo.findByIdAndUpdate(
                // req.params.id,
                // { complete: req.body.complete }, // req.body icinde gelen herseyi set ediyoruz. yani update ediyoruz
                // { new: true }
                req.params.id,
                { $set: req.body }, // req.body icinde gelen herseyi set ediyoruz. yani update ediyoruz
                { new: true }
            )

            res.status(200).json(updatedTodo)
        } else {
            return next(createError(404, 'You can Update only your Todo!'))
        }
    } catch (err) {
        next(err)
    }
})

// COMPLETE TODO
// @route GET /api/todos/complete/:id
const completeTodo = asyncHandler(async (req, res, next) => {
    try {
        const todo = await Todo.findById(req.params.id)

        if (!todo) return next(createError(404, 'Todo not found!'))

        //const complete = !todo.complete
        if (req.user.id === todo.userId) {
            // req.user.id 'daki id authMiddleware icindeki verifyToken'daki jwt.verify icinden gonderilen req.user icinden geliyor

            const completedTodo = await Todo.findByIdAndUpdate(
                req.params.id,
                { complete: !todo.complete },
                { new: true }
            )

            //res.status(200).json('Todo updated')
            res.status(200).json({ id: req.params.id, complete: completedTodo.complete })
        } else {
            return next(createError(404, 'You can Complete only your Todo!'))
        }
    } catch (err) {
        next(err)
    }
})

// DELETE TODO
// @route DELETE /api/todos/:id
const deleteTodo = asyncHandler(async (req, res, next) => {
    try {
        const todo = await Todo.findById(req.params.id)

        if (!todo) return next(createError(404, 'Todo not found!'))

        if (req.user.id === todo.userId) {
            // req.user.id 'daki id authMiddleware icindeki verifyToken'daki jwt.verify icinden gonderilen req.user icinden geliyor

            await Todo.findByIdAndDelete(req.params.id)

            //res.status(200).json('Todo updated')
            res.status(200).json({ id: req.params.id })
        } else {
            return next(createError(404, 'You can Delete only your Todo!'))
        }
    } catch (err) {
        next(err)
    }
})

// GET A TODO
// @route PUT /api/todos/:id
const getSingleTodo = asyncHandler(async (req, res, next) => {
    try {
        const todo = await Todo.findById(req.params.id)
        // req.params.id 'daki id router.get('/:id', verifyToken, getSingleTodo)'daki id'den geliyor

        if (!todo) return next(createError(404, 'Todo not found!'))
        if (req.user.id === todo.userId) {
            res.status(200).json(todo)
        } else {
            return next(createError(404, 'You can Get only your Todo!'))
        }
    } catch (err) {
        next(err)
    }
})

module.exports = {
    addTodo, completeTodo, deleteTodo, getSingleTodo, getTodos, updateTodo
}