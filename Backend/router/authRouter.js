const express = require('express');
const router  = express.Router();
const User = require('../models/Users');
const argon2 = require('argon2');
const validator = require('validator');
const rateLimit = require('express-rate-limit');
const auth = require('../middlewares/auth');
const signupValidator = require('../utils/signupValidator');

const loginLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,  // 1 minute
    max: 5,                   // Limit each IP to 5 requests per window
    message: 'Too many login attempts. Try again later.',
    standardHeaders: true,
    legacyHeaders: false,
  });


router.post('/user/signup', async (req, res, next) => {
    const { photoUrl, firstName, lastName, emailId, passWord, gender, about } = req.body;

    try {
        signupValidator(req);

        const hashedPassword = await argon2.hash(passWord, 10)
        console.log("hashedpassword->", hashedPassword)

        const user = new User(
            {
                photoUrl,
                firstName,
                lastName,
                gender,
                about,
                emailId,
                passWord: hashedPassword
            })
        console.log('user->', user)
        await user.save()
        res.status(201).send("User saved successfully...")
    }
    catch (err) {
        console.log("err->", err)
        res.status(400).send(`${err.name}: ${err.message}`)
    }

    console.log('data saved...')
})

router.post('/user/login',loginLimiter, async (req, res) => {
    console.log('body->',req.body)
    const { emailId, passWord } = req?.body;
    try {
        if (!validator.isEmail(emailId)) {
            console.log('Email validation failed...')
            throw new Error('EmailId is Invalid')
        }
        const user = await User.findOne({ emailId: emailId })
        const comparePassword = await argon2.verify(user.passWord,passWord)
        if (comparePassword) {
            const token = await user.generateAuthToken();
            console.log('token->',token)
            res.cookie('token',token)
            res.status(200).send('Login Successfull', user);
        }
        else {
            res.status(404).send('Login failed')
        }
    }
    catch (err) {
        res.status(404).send(`Login failed : ${err.message}`,)
    }
})


router.post('/user/logout',auth,(req,res)=>
    {
        try
        {   const  token = req?.cookies?.token;
            if(!token)
                {
                    res.status(400).send('Login First')
                }
            res.clearCookie('token');
            res.status(200).send('Logout Successfull...');
        }
        catch(err)
        {
            res.status(400).send(`Logout failed : ${err.message}`)
        }
    })


module.exports = router;