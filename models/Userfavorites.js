const mongoose = require('mongoose')

const UserFavoriteSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    files:{
        type: Array,

    }

})

// sample new favoirt record from frontend

//  {
// name: "my first favorite",
// file: {
//     "_id": "6081d3e3d06da83a74b8f31c",
//     "length": 63737,
//     "chunkSize": 261120,
//     "uploadDate": "2021-04-22T19:52:07.385Z",
//     "filename": "48.mp3",
//     "md5": "bff0fbb28d2e6d3a6e358ec65d3ca29e",
//     "contentType": "audio/mpeg"
//      },
// }
    

module.exports = UserFavorite = mongoose.model('UserFavorite', UserFavoriteSchema)