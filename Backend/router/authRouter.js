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
        res.status(201).json({message:"User saved successfully...",user:user})
    }
    catch (err) {
        console.log("err->", err)
        res.status(400).send(`${err.name}: ${err.message}`)
    }

    console.log('data saved...')
})

router.post('/user/login', loginLimiter, async (req, res) => {
    const { emailId, passWord } = req.body;
    try {
        if (!validator.isEmail(emailId)) {
            const error = new Error('Invalid email address format.');
            error.statusCode = 400;
            throw error;
        }
        const user = await User.findOne({ emailId });
        if (!user) {
            const error = new Error('No account found with this email.');
            error.statusCode = 404;
            throw error;
        }
        const comparePassword = await argon2.verify(user.passWord, passWord);
        if (!comparePassword) {
            const error = new Error('Incorrect password.');
            error.statusCode = 401;
            throw error;
        }
        const token = await user.generateAuthToken();
        res.cookie('token', token);
        res.status(200).json({ message: 'Login successful', user });
    } catch (err) {
        // Use the statusCode if set, otherwise default to 500
        res.status(err.statusCode || 500).json({
            error: err.message || 'An unexpected error occurred. Please try again.'
        });
    }
});


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