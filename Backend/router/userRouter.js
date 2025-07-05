const express = require('express')
const router = express.Router();
const auth = require('../middlewares/auth')
const Request = require('../models/Request')
const User = require('../models/Users')

// Get all accepted connections for the logged-in user
router.get('/users/connections', auth, async (req, res) => {
    const loggedInUser = req.user._id;
    try {
        // Find all accepted connections where user is either sender or receiver
        const connections = await Request.find({
            status: "Accepted",
            $or: [
                { toUserId: loggedInUser },
                { fromUserId: loggedInUser }
            ]
        }).populate([
            {
                path: 'fromUserId',
                select: 'firstName lastName photoUrl emailId'
            },
            {
                path: 'toUserId',
                select: 'firstName lastName photoUrl emailId'
            }
        ]);

        if (connections.length === 0) {
            return res.status(200).json({
                message: "No connections found",
                data: []
            });
        }

        res.status(200).json({
            message: "Connections fetched successfully",
            data: connections
        });
    }
    catch (err) {
        console.error('Error fetching connections:', err);
        res.status(500).json({
            message: "Cannot fetch connections",
            error: err.message
        });
    }
})

// Get all pending connection requests received by the logged-in user
router.get('/users/requests/received', auth, async (req, res) => {
    const loggedInUser = req.user._id;
    try {
        const requests = await Request.find({
            toUserId: loggedInUser,
            status: "Interested"
        }).populate('fromUserId', 'photoUrl firstName lastName emailId');

        if (requests.length === 0) {
            return res.status(200).json({
                message: "No pending connection requests found",
                data: []
            });
        }

        res.status(200).json({
            message: "Connection requests fetched successfully",
            data: requests
        });
    }
    catch (err) {
        console.error('Error fetching connection requests:', err);
        res.status(500).json({
            message: "Cannot fetch connection requests",
            error: err.message
        });
    }
})

// Get all connection requests sent by the logged-in user
router.get('/users/requests/sent', auth, async (req, res) => {
    const loggedInUser = req.user._id;
    try {
        const requests = await Request.find({
            fromUserId: loggedInUser,
            status: "Interested"
        }).populate('toUserId', 'photoUrl firstName lastName emailId');

        if (requests.length === 0) {
            return res.status(200).json({
                message: "No sent connection requests found",
                data: []
            });
        }

        res.status(200).json({
            message: "Sent connection requests fetched successfully",
            data: requests
        });
    }
    catch (err) {
        console.error('Error fetching sent connection requests:', err);
        res.status(500).json({
            message: "Cannot fetch sent connection requests",
            error: err.message
        });
    }
})


router.get('/users/feed', auth, async (req, res) => {

    const page = parseInt(req.query.skip) || 0;
    const skip = Math.max((page-1)*10,0)
    const limit = parseInt(req.query.limit) || 10;

    const loggedInUser = req.user._id;
    try {
        const allUsers = await User.find();
        const interactionUser = await Request.find({
            $or: [{ fromUserId: loggedInUser }, { toUserId: loggedInUser }]
        })
        const hideUser = new Set();

        interactionUser.forEach((key) => {
            hideUser.add(key.fromUserId.toString());
            hideUser.add(key.toUserId.toString());
        });

        // console.log("AllUsers->",allUsers)
        const excludeIds = Array.from(hideUser);
        const availableUsers = await User.find({ _id: { $nin: excludeIds } })
            .skip(skip)
            .limit(limit);

        console.log("availableUsers->", availableUsers)
        res.status(200).json({
            message: "Feed users fetched successfully",
            data: availableUsers,
            total: availableUsers.length,
            page,
            limit
        })
    }
    catch (err) {
        console.log("err->", err)
        res.json({ message: "Error Occured:", Error: err })
    }
})


module.exports = router;