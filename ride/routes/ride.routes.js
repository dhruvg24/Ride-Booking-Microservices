const express=require('express')
const router= express.Router()
const authMiddleware =require('../middleware/auth.middleware.js')
const rideController = require('../controller/ride.controller.js')

// router for creating a ride - **constraint:ONLY USER CAN CREATE RIDE

router.post('/create-ride', authMiddleware.userAuth, rideController.createRide)
router.post('/accept-ride', authMiddleware.captainAuth, rideController.acceptRide)
module.exports=router