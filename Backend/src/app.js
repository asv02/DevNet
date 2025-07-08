const express = require('express')
const { connectDb } = require('../config/database')
const cors = require('cors')

const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    methods:['GET','POST','PUT','PATCH','DELETE'],
    credentials: true
}))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    next();
  });

const cookieParser = require('cookie-parser')
const authRouter = require('../router/authRouter')
const profileRouter = require('../router/profileRouter')
const requestRouter = require('../router/connectionRequestRouter')
const userRouter = require('../router/userRouter')


app.use(express.json());
app.use(cookieParser())


app.use('/',authRouter)
app.use('/',profileRouter)
app.use('/',requestRouter)
app.use('/',userRouter)


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
