const express = require('express');
const Request = require("../models/Request");
const auth = require('../middlewares/auth');
const User = require('../models/Users');
const router  = express.Router();

router.post('/request/send/:status/:userId',auth,async(req,res)=>
    {
        try
        {
            const touserId = req.params.userId;
            const status = req.params.status;
            
            const presentUserId = await User.findById(touserId);
            
            if(!presentUserId)
                {
                    throw new Error('User Id not Present.')
                }

            const requestSent = await Request.findOne({$or:[{fromUserId:req.user._id,toUserId:touserId},{fromUserId:touserId,toUserId:req.user._id}]})
 
            if(requestSent)
                {   console.log("sent->",requestSent)
                    // console.log("recieved->",requestRecieved)
                    throw new Error('Connection request already in Progress')
                }

            const allowedStatus = ['Interested','Ignored']
            if(!allowedStatus.includes(status))
                {
                    throw new Error('Status not allowed')
                }
            const request = new Request(
                {
                    fromUserId:req.user._id,
                    toUserId: touserId,
                    status:status
                })
            const data = await request.save()
            res.status(201).json({message:"Request Sent",data:data})

        }
        catch(err)
        {
            res.status(404).send(`Connection request failed due to : ${err}`)
        }
    })


    router.post('/request/review/:status/:requestId',auth,async(req,res)=>
        {
            try
            {
                const status = req.params.status;
                if(!['Accepted','Rejected'].includes(status))
                    {
                        throw new Error('Status not allowed');
                    }
                const requestId = req.params.requestId;
                const requests = await Request.findOne({_id:requestId,toUserId:req.user._id,status:'Interested'})
                console.log("requests->",requests)
                if(!requests)
                    {
                        throw new Error('No connection requests found with this Id.')
                    }
                if(requests.status !='Interested')
                    {
                        throw new Error('Other user is not interested in you.');
                    }
                if(req.user._id.toString() !== requests.toUserId.toString())
                    {
                        throw new Error('You are not allowed to change the status of other user.')
                    }
                requests.status = status;
                const data = await requests.save();
                res.status(200).json({message: `${status} successfully`, data: data})
            }
            catch(err)
            {
               res.status(404).send(`Error in updating status due to ${err}`)
            }
        })

module.exports = router;