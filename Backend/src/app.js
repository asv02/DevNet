const express = require('express')
const { adminAuth } = require('../middlewares/auth')
const { connectDb } = require('../config/database')
const User = require('../models/Users')
const app = express()

app.use(express.json());
app.use('/admin', adminAuth);


app.post('/user/signup', async (req, res, next) => {
    const body = req.body;

    try {
        const user = new User(body)
        console.log('user->',user)
        await user.save()
        res.status(201).send("User saved successfully...")
    }
    catch (err) {
        console.log("err->",err)
        res.status(400).send(`${err.name}: ${err.message}`)
    }

    console.log('data saved...')
})

app.get('/user/getUsers', async (req,res) => {
    const userEmail = req.body.emailId
    console.log("userEmail->",userEmail)
    try {
        const user = await User.findOne({ emailId: userEmail });
        console.log(user)
        res.status(200).send(user);
    }
    catch (err) {
        console.log("error in fetching ->",err)
        res.status(400).send("Some went wrong during  getting feed..")
    }
})

app.get('/user/getUserById', async (req,res) => {
    const userId = req.query.userId
    console.log("id->",userId)
    // console.log("userEmail->",userEmail)
    try {
        const user = await User.findById(userId);
        console.log(user)
        res.status(200).send(user);
    }
    catch (err) {
        console.log("error in fetching ->",err)
        res.status(400).send("Some went wrong during  getting feed..")
    }
})

app.get('/user/feed',async(req,res)=>
    {
        try
        {
            const users = await User.find({})
            console.log(users)
            return res.status(200).send(users)
        }
        catch
        {
            console.log('Something went wrong...')
            return res.status(404).send('something went wrong with feed.')
        }
    })

app.delete('/user/deleteById',async(req,res)=>
    {
        const userId = req.query.userId
        console.log("userId->",userId)
        try {
            const user = await User.findByIdAndDelete(userId);
            console.log("user deleted->",user)
            res.status(200).send("User Deleted successfully...")
        } catch (err) {
            res.send(500).send('Something went wrong...')
        }
    })

    app.patch('/user/updateById',async(req,res)=>
        {
            const userId = req.query.userId
            const data = req.body
            console.log("userId->",userId)
            try {
                const updateAllow = ['gender','about','passWord']
                
                const isUpdateAllowed = Object.keys(data).every((k)=>{return updateAllow.includes(k)}) 
                
                if(!isUpdateAllowed)
                    {
                        throw new Error('Update now allowed')
                    }

                const user = await User.findByIdAndUpdate(userId,data,{returnDocument:'after',runValidators:true});
                console.log("user updated->",user)
                res.status(200).send("user updated...",user)
            } catch (err) {
                res.status(500).send(`${err.name} : ${err.message}`)
            }
        })


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
