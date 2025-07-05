const express = require('express')
const { default: mongoose } = require('mongoose')

const RequestSchema = new mongoose.Schema(
    {
        fromUserId:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        toUserId:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        status:
        {   
            type: String,
            enum: {values:['Ignored','Interested','Accepted','Rejected','Pending'],
                message:"Connection Status is not valid"
            }
        }
    })

RequestSchema.pre('save',function()
{
    const request = this;
    if(request.fromUserId.equals(request.toUserId))
        {
            throw new Error('Cannot Sent Request');
        }
})

const Request = mongoose.model('Request',RequestSchema)

module.exports = Request;