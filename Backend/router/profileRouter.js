const express = require('express');
const router  = express.Router();
const argon2 = require('argon2');
const auth = require('../middlewares/auth');
const updateValidator = require('../utils/updateValidator')


router.get('/user/getUser',auth, async (req, res) => {
    try {
        const user = req.user;
        console.log(user)
        res.status(200).json({message:"User get fetched",user:user});
    }
    catch (err) {
        console.log("error in fetching ->", err)
        res.status(400).send("Some went wrong during  getting feed..")
    }
})

router.patch('/user/updateUser',auth,async(req,res)=>
{
    const user = req.user;
    if(!updateValidator(req))
        {
            res.status(404).send("Fields not allowed to update");
        }
    try
    { 
        Object.keys(req.body).forEach((key) => user[key] = req.body[key]);
        await user.save();
        res.status(200).json({message:"Profile updated successfully",user:user});
    }
    catch(err){
        res.status(400).send(`Error in updating user : ${err.message}`)
    }
})


module.exports = router;