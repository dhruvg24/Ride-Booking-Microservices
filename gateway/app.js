const express = require('express')
const expressProxy = require('express-http-proxy')

const app = express()

app.use('/user', expressProxy('http://localhost:3001'))
// any request coming from user route will be given to port 3001
app.use('/captain', expressProxy('http://localhost:3002'))
// any request coming from captain route will be given to port 3002

app.listen(3000, ()=>{
    console.log('Gateway server running on port 3000')
})

// gateway server running on port 3000
