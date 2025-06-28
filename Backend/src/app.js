const express = require('express')

const {adminAuth} = require('../middlewares/auth')

const app = express()

app.use('/admin',adminAuth);

app.get('/admin/getAllData',(req,res,next)=>
    { 
        console.log('admin aduthorized URL')
        res.send('All Data...')
    })

app.get('/user',(req,res,next)=>
    {
        console.log('get users information.....')
        res.send('Users response...')
    })

app.post('/user/:userId',(req,res)=>
    {
        console.log(req.params)
        throw new Error('Some error')   
    })

app.use('/',(err,req,res,next)=>
    {
        console.log(err)
        res.send('Error are part of development...')
    })

app.listen(3000,()=>
    {
        console.log('server started on  port 3000')
    })