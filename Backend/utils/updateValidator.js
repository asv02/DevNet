

const updateValidator = (req) => {
        const updateUser = ["photoUrl", "firstName", "lastName", "about"]
        const validate = Object.keys(req.body).every((key) => updateUser.includes(key));
        return validate;
}

module.exports = updateValidator;
