const express = require('express')
const { connectDb } = require('../config/database')

const cookieParser = require('cookie-parser')

const app = express()
const authRouter = require('../router/authRouter')
const profileRouter = require('../router/profileRouter')
const requestRouter = require('../router/connectionRequestRouter')
const userRouter = require('../router/userRouter')
app.use(express.json());
app.use(cookieParser())

app.use('/api',authRouter)
app.use('/api',profileRouter)
app.use('/api',requestRouter)
app.use('/api',userRouter)


connectDb().then(() => {
    console.log('database connected')
    app.listen(3000, () => {
        console.log('server started on  port 3000')
    })
})
    .catch((err) => {
        console.log('Some error occured in connection to database')
        console.error(err)
    })
