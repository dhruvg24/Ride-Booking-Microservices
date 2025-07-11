const jwt = require('jsonwebtoken')
// need to get the user data - done using axios
const axios = require('axios')



module.exports.userAuth = async(req, res, next)=>{
    try{
        const token= req.cookies.token || req.headers.authorization.split(' ')[1]

        if(!token){
            res.status(401).json({message: 'Unauthorized'})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const response = await axios.get(`${process.env.BASE_URL}/user/profile`, {headers:{
            Authorization : `Bearer ${token}`
        }});
        
        const user = response.data
        
        if(!user){
            return res.status(401).json({message: 'Unauthorized user'})
        }
        req.user=user
        next();

    }catch(error){
        res.status(500).json({message: error.message});
    }
}


// creating captainAuth middleware -> for accept ride functionality
module.exports.captainAuth=async(req, res, next)=>{
    try{
        const token = req.cookies.token||req.headers.authorization.split(' ')[1]
        if(!token){
            return res.status(401).json({message: 'Unauthorized '})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const response = await axios.get(`${process.env.BASE_URL}/captain/profile`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

        const captain = response.data;

        if(!captain){
            return res.status(401).json({message: 'Unauthorized captain'})
        }
        req.captain = captain;

        next()
    }catch(err){
        res.status(500).json({message: err.message})
    }
}