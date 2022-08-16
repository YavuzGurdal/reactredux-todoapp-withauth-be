const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/UserModel')

// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import asyncHandler from 'express-async-handler';

// import User from '../models/UserModel.js';

// import { createError } from '../error.js'

// @desc Register new user
// @route POST /api/auth/signup
// @access Public
const signup = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Cheeck if user exists
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc Authenticate a user
// @route POST /api/auth/signin
// @access Public
const signin = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body

    // Check for user email
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        // bcrypt'in karsilastirma islevi. 1.parametre gelen password 2.parametre DB'den gelen password.
        // bu kendisi hash'li sekilde islemleri yapiyor
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// @desc Get user data
// @route GET /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user) // authMiddleware'de verifyToken icinde direk user'a ulasmak icin yazdim bunu
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d' // ne kadar surede gecersiz olacagi
    })
}

module.exports = {
    signup,
    signin,
    getMe,
}

// // @desc Logout a user
// // @route POST /api/auth/logout
// // @access Public
// export const logout = async (req, res, next) => {
//     try {
//         res.clearCookie('access_token') // cookie'yi siliyorum

//         res.status(200).json('Successfully Logged Out')
//     } catch (err) {
//         next(err)
//     }
// }