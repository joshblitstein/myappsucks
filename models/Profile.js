const mongoose = require('mongoose')


const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
  
    files: {
      type: [{
            fileName: String, 
            number: Number
        }]
    },
 
    fileName : [String],

    fileNumber: [Number],
  
    location:{
        type: String
    },
    status: {
        type: String,
      
    },
    skills: {
        type: String,
      
    },
    bio: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }



})

module.exports = Profile = mongoose.model('profile', ProfileSchema)