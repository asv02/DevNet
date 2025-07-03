const express = require('express')
const { connectDb } = require('../config/database')

const cookieParser = require('cookie-parser')

const app = express()
const authRouter = require('../router/authRouter')
const profileRouter = require('../router/profileRouter')
app.use(express.json());
app.use(cookieParser())

app.use('/api',authRouter)
app.use('/api',profileRouter)

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
