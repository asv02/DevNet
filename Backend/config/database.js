const mongoose = require('mongoose')

console.log('Database file')
const connectDb = async()=>{
    await mongoose.connect('mongodb+srv://akash07may:FCpOYPOMh5pZV2t0@devnet.bhao3ee.mongodb.net/DevNet?retryWrites=true&w=majority&appName=DevNet&family=4')
}

module.exports = {
    connectDb
}