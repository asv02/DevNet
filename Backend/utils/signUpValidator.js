const validator = require('validator');

const signupValidator = (req)=>
    {
        const {firstName,lastName,emailId,gender} = req.body;
        
        if(!firstName || firstName.length>50)
            {
                throw new Error('First Name is Invalid');
            }
        else if(!lastName || lastName.length>50)
            {
                throw new Error('Last Name is Invalid');
            }
        else if(!validator.isEmail(emailId))
            {
                 throw new Error('EmailId is required.');
            }
        else if(['male','female','other'].includes(gender))
            {
                throw new Error('Gender is Invalid');
            }
    }

module.exports = signupValidator