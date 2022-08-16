// import express from 'express';
// import { signup, signin, getMe } from '../controllers/authController.js'
// import { verifyToken } from '../middleware/authMiddleware.js';

const express = require('express')
const router = express.Router()
const {
    signup,
    signin,
    getMe,
} = require('../controllers/authController')
const { verifyToken } = require('../middleware/authMiddleware')

// const router = express.Router();

router.post('/signup', signup)

router.post('/signin', signin)

router.get('/me', verifyToken, getMe) // protect token icin ekledim

// router.get('/logout', logout)
module.exports = router