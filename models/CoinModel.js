// import mongoose from "mongoose";
const mongoose = require('mongoose')

const CoinSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        coinName: {
            type: String,
            required: true,
        },
        coinBuyPrice: {
            type: String,
            required: true,
        },
        coinBuyTime: {
            type: String,
            required: true,
        },
        coinAmount: {
            type: String,
            required: true,
        },
        stockMarketName: {
            type: String,
            // required: true,
        },
        note: {
            type: String,
            // required: true,
        },
        // complete: {
        //     type: Boolean,
        //     default: false,
        // },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Coin", CoinSchema);