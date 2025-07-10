const express = require('express')
const { connectDb } = require('../config/database')
const cors = require('cors')
const http = require('http')
const socketIo = require('socket.io')

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

const server = http.createServer(app)
const io = socketIo(server,{
    cors:{
        origin: "http://localhost:5173",
    }
})

io.on("connection",(socket)=>
    {
        socket.on("joinChat",({loginUserId,userId})=>
            {
                const roomId = [loginUserId,userId].sort().join('_');
                console.log("roomId->",roomId);
                socket.join(roomId);
            })
        socket.on("sendMessages",({ loginUserId, userId,text})=>
            {
                const roomId = [loginUserId,userId].sort().join('_');
                console.log("roomId in sendMessages->",text);
                io.to(roomId).emit("receiveMessage",{loginUserId,userId,text});
            })
        socket.on("disconnet",()=>{})
    })

connectDb().then(() => {
    console.log('database connected')
    server.listen(3000, () => {
        console.log('server started on  port 3000')
    })
})
    .catch((err) => {
        console.log('Some error occured in connection to database')
        console.error(err)
    })
