const mongoose = require('mongoose')
require('dotenv').config()

const DBURL = process.env.MONGODB_URL

function connectToDB() {
    mongoose.connect(DBURL)
    mongoose.connection.on('connected', ()=> {
        console.log("mongoose connected")
    });

    mongoose.connection.on("error", (error)=> {
        console.log("connection error", error);
    })
}


module.exports = {connectToDB}