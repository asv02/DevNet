const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema(
    {
        photoUrl:
        {
            type:String,
            validate(value)
            {
                if(!validator.isURL(value))
                    {
                        throw new Error('Enter valid photo url');
                    }
            }
        },
        firstName: {
            type: String,
            required:true,
            uppercase:true
        },
        lastName:
        {
            type: String
        },
        emailId:
        {
            type: String,
            required:true,
            lowercase: true,
            unique:true,
            validate(value)
            {
                if(!validator.isEmail(value))
                    {
                        throw new Error('Email Address Invalid!')
                    }
            }
        },
        passWord:
        {
            type: String,
            required:true,
            minLength:8,
            validate(value)
            {
                if(!validator.isStrongPassword(value))
                    {
                        throw new Error("Password must be of at least length 8 and include 1 uppercase and 1 lowercase character");
                    }
            }
        },
        gender:
        {
            type: String,
            required:true,
            validate(value)
            {
                if(!['male','female','other'].includes(value))
                    {
                        throw new Error('Not valid Gender')
                    }
            },
            lowercase:true,
            
        },
        about:
        {
            type: String,
            default:"Nothing"
        }
    },{ timestamps: true })

    userSchema.methods.generateAuthToken = async function()
    {
        try
        {   
            const user = this;
            const token = jwt.sign({_id:user._id},'akash@123')
            return token;
        }
        catch(err)
        {
            console.log('Error in generating token',err)
            throw new Error('Error in generating token')
        }
    }


const User = mongoose.model('User', userSchema)
module.exports = User;