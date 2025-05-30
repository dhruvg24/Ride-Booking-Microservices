const rideModel = require('../models/ride.model.js')
const{subscribeToQueue, publishToQueue} = require('../service/rabbit.js')
module.exports.createRide=async(req,res,next)=>{
    const {pickup, destination} = req.body

    if(!pickup || !destination){
        return res.status(400).json({ error: 'Pickup and destination are required.' });
    }

    const newRide = new rideModel({
        user: req.user._id,
        pickup,
        destination
    });




    // after creation of new ride need to notify captains about the ride -> using async communication (RabbitMQ)
    

    await newRide.save()
    publishToQueue("new-ride",JSON.stringify(newRide))
    res.send(newRide)
    
}

module.exports.acceptRide=async(req, res, next)=>{
    const {rideId} = req.query;
    const ride=await rideModel.findById(rideId)
    if(!ride){
        return res.status(400).json({message: 'Ride not found'})
    }
    ride.status='accepted'
    await ride.save()
    publishToQueue('ride-accepted', JSON.stringify(ride))
    // new queue - RabbitMQ
    res.send(ride);

}