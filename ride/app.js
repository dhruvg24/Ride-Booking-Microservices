const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app=express()
const connect=require('./db/db.js')
const cookieParser = require('cookie-parser')
const rideRoutes = require('./routes/ride.routes.js')
connect()

const rabbitMQ = require('./service/rabbit.js')

rabbitMQ.connect()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use('/',rideRoutes)
// rabbitMQ for messaging Queue


module.exports=app