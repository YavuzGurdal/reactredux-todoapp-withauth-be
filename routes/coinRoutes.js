// import express from 'express';
// import { verifyToken } from '../middleware/authMiddleware.js';
// import { addCoin, completeCoin, deleteCoin, getSingleCoin, getCoins, updateCoin } from '../controllers/CoinController.js';

// const router = express.Router();

const express = require('express')
const router = express.Router()
const {
    addCoin, completeCoin, deleteCoin, getSingleCoin, getCoins, updateCoin
} = require('../controllers/coinController')

const { verifyToken } = require('../middleware/authMiddleware')

router.post('/', verifyToken, addCoin)
router.put('/:id', verifyToken, updateCoin)
router.get('/complete/:id', verifyToken, completeCoin)
router.delete('/:id', verifyToken, deleteCoin)
router.get('/', verifyToken, getCoins)
router.get('/:id', verifyToken, getSingleCoin)

module.exports = router