// import mongoose from "mongoose";
const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conndb = await mongoose.connect(process.env.MONGO_URI, { // burdan db ye baglaniyorum
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            //useFindAndModify: false,
        });

        console.log(`MongoDB connected: ${conndb.connection.host}`.cyan.underline);
    } catch (err) {
        console.log(err)

        process.exit(1)
        // throw err
    }
}

module.exports = connectDB