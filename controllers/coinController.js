const asyncHandler = require('express-async-handler')

const Coin = require('../models/CoinModel')
const { createError } = require('../error');

// import asyncHandler from 'express-async-handler';
// import Coin from '../models/CoinModel.js';

// GET ALL CoinS
// @route GET /api/Coins/
const getCoins = asyncHandler(async (req, res, next) => {
    try {
        const coins = await Coin.find({ userId: req.user.id })
        // find({ userId: req.params.id }) bu sekilde find icinde arama kriteri yazabiliyoruz

        res.status(200).json(coins)
    } catch (err) {
        next(err)
    }
})

// CREATE A Coin
// @route POST /api/Coins/
const addCoin = asyncHandler(async (req, res, next) => {

    const { coinName, coinBuyPrice, coinBuyTime, coinAmount, stockMarketName, note } = req.body

    if (!coinName || !coinBuyPrice || !coinBuyTime || !coinAmount || !stockMarketName || !note) {

        return next(createError(400, 'Please add a Coin'))
        // res.status(400)
        // throw new Error('Please add all fields')
    }

    // Create coin
    try {
        const savedCoin = await Coin.create({ userId: req.user.id, coinName, coinBuyPrice, coinBuyTime, coinAmount, stockMarketName, note })

        res.status(200).json(savedCoin)
    } catch (err) {
        next(err)
    }


    // if (coin) {
    //     res.status(200).json(coin)
    // } else {
    //     res.status(400)
    //     throw new Error('Invalid coin data')
    // }

    // try {
    //     const savedCoin = await newCoin.save()

    //     res.status(200).json(savedCoin)
    // } catch (err) {
    //     next(err)
    // }
})
// const addCoin = asyncHandler(async (req, res, next) => {
//     if (!req.body.coin) return next(createError(400, 'Please add a Coin'))

//     const newCoin = new Coin({ userId: req.user.id, ...req.body })

//     // Coin modeldekine gore userId'yi yukaridaki gibi ekliyorum. 
//     // req.user.id 'daki id authMiddleware icindeki verifyToken'daki jwt.verify icinden gonderilen req.user icinden geliyor

//     try {
//         const savedCoin = await newCoin.save()

//         res.status(200).json(savedCoin)
//     } catch (err) {
//         next(err)
//     }
// })

// UPDATE A Coin
// @route PUT /api/Coins/:id
const updateCoin = asyncHandler(async (req, res, next) => {
    try {
        if (!req.body.coin) return next(createError(400, 'Please add a Coin'))

        const coin = await Coin.findById(req.params.id)
        // req.params.id 'daki id router.put('/:id', verifyToken, updateCoin)'daki id'den geliyor

        if (!coin) return next(createError(404, 'Coin not found!'))
        if (req.user.id === coin.userId) {
            // req.user.id 'daki id authMiddleware icindeki verifyToken'daki jwt.verify icinden gonderilen req.user icinden geliyor

            const updatedCoin = await Coin.findByIdAndUpdate(
                // req.params.id,
                // { complete: req.body.complete }, // req.body icinde gelen herseyi set ediyoruz. yani update ediyoruz
                // { new: true }
                req.params.id,
                { $set: req.body }, // req.body icinde gelen herseyi set ediyoruz. yani update ediyoruz
                { new: true }
            )

            res.status(200).json(updatedCoin)
        } else {
            return next(createError(404, 'You can Update only your Coin!'))
        }
    } catch (err) {
        next(err)
    }
})

// COMPLETE Coin
// @route GET /api/Coins/complete/:id
const completeCoin = asyncHandler(async (req, res, next) => {
    try {
        const coin = await Coin.findById(req.params.id)

        if (!coin) return next(createError(404, 'Coin not found!'))

        //const complete = !Coin.complete
        if (req.user.id === coin.userId) {
            // req.user.id 'daki id authMiddleware icindeki verifyToken'daki jwt.verify icinden gonderilen req.user icinden geliyor

            const completedCoin = await Coin.findByIdAndUpdate(
                req.params.id,
                { complete: !coin.complete },
                { new: true }
            )

            //res.status(200).json('Coin updated')
            res.status(200).json({ id: req.params.id, complete: completedCoin.complete })
        } else {
            return next(createError(404, 'You can Complete only your Coin!'))
        }
    } catch (err) {
        next(err)
    }
})

// DELETE Coin
// @route DELETE /api/Coins/:id
const deleteCoin = asyncHandler(async (req, res, next) => {
    try {
        const coin = await Coin.findById(req.params.id)

        if (!coin) return next(createError(404, 'Coin not found!'))

        if (req.user.id === coin.userId) {
            // req.user.id 'daki id authMiddleware icindeki verifyToken'daki jwt.verify icinden gonderilen req.user icinden geliyor

            await Coin.findByIdAndDelete(req.params.id)

            //res.status(200).json('Coin updated')
            res.status(200).json({ id: req.params.id })
        } else {
            return next(createError(404, 'You can Delete only your Coin!'))
        }
    } catch (err) {
        next(err)
    }
})

// GET A Coin
// @route PUT /api/Coins/:id
const getSingleCoin = asyncHandler(async (req, res, next) => {
    try {
        const coin = await Coin.findById(req.params.id)
        // req.params.id 'daki id router.get('/:id', verifyToken, getSingleCoin)'daki id'den geliyor

        if (!coin) return next(createError(404, 'Coin not found!'))
        if (req.user.id === coin.userId) {
            res.status(200).json(coin)
        } else {
            return next(createError(404, 'You can Get only your Coin!'))
        }
    } catch (err) {
        next(err)
    }
})

module.exports = {
    addCoin, completeCoin, deleteCoin, getSingleCoin, getCoins, updateCoin
}