const jwt = require('jsonwebtoken')
const userModel= require('../models/user.model')
const blacklisttokenModel = require('../models/blacklisttoken.model.js')

module.exports.userAuth=async(req, res,next)=>{
    try{
        const token = req.cookies.token||req.headers.authorization.split(' ')[1];
        if(!token){
            return res.status(401).json({message: 'Unauthorized'})
        }

        // if the token is blacklisted then can't access profile.
        const isBlacklisted= await blacklisttokenModel.find({token});

        if(isBlacklisted.length){
            return res.status(401).json({message: 'Unauthorized'})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded.id);

        if(!user){
            return res.status(401).json({message: 'Unauthorized'})
        }
        req.user=user
        next()
    }catch{
        res.status(500).json({message: error.message})
    }
}