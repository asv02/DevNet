const express = require('express')
const { adminAuth } = require('../middlewares/auth')
const { connectDb } = require('../config/database')
const User = require('../models/Users')
const app = express()
app.use('/admin', adminAuth);

app.use(express.json());

app.post('/user/signup', async (req, res, next) => {
    const body = req.body;
    console.log(body)
    const user = new User(req.body)
    await user.save()

    console.log('data saved...')
    res.send('All Data...')
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
