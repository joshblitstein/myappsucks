const mongoose = require('mongoose')


const FavoritesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    
})