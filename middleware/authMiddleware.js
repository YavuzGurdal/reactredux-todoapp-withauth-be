// bunu crud islemlerinde kullaniyoruz. 
// islem yapan kisi ile login olan kisinin ayni kisi olup olmadigini kontrol ediyoruz

const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/UserModel')

// import jwt from 'jsonwebtoken';
// // import { createError } from '../error.js';
// import asyncHandler from 'express-async-handler'
// import User from '../models/UserModel.js';

const verifyToken = asyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1] // Bearer token seklinde geldigi icin bu sekilde token'i aliyorum

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET) // jwt'den gelen metot. token dogrulayip decod ediyor

            // Get user from the token
            req.user = await User.findById(decoded.id).select('-password')
            // user'in icinden password'u cikarip gonderiyoryum.
            // bu sekilde verifyToken kullanilan heryerde user bilgilerine ulasabilecegim

            // burdaki id'yi userController'da generateToken fonksiyonunda sign icine gomuyorum

            next()
        } catch (error) {
            console.log(error);
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports = { verifyToken }

// export const verifyToken = (req, res, next) => {
//     const token = req.cookies.access_token;

//     if (!token) return next(createError(401, 'Not Authenticated!'))

//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//         // jwt'nin verify metodu ile token'in gecerli olup olmadigina bakiyoruz
//         // (err, user) jwt'den geliyor. user icinde user id var

//         if (err) return next(createError(403, 'Token is not valid!'))

//         req.user = user; // bu sekilde verifyToken'in kullanildigi yerlerde user bilgilerini kullanabilirim
//         // console.log(user)
//         next()
//     })
// }