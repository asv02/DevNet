const express = require('express');
const router  = express.Router();
const auth = require('../middlewares/auth');


router.get('/user/getUser',auth, async (req, res) => {
    try {
        const user = req.user;
        console.log(user)
        res.status(200).send(user);
    }
    catch (err) {
        console.log("error in fetching ->", err)
        res.status(400).send("Some went wrong during  getting feed..")
    }
})

module.exports = router;