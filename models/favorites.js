const mongoose = require('./connections.js')
const User = require('./user.js')
const Fauna = require('./faunas.js')



const { Schema, model } = mongoose


const favoriteSchema = new mongoose.Schema(
    
    {
    favoritedTrue: {
        type: Boolean,
        required: true
    },

    personFavorited: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    faunaFavorited: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fauna'
    }
}

,{
        timestamps: true
    }
)

const Favorite = model('Favorite', favoriteSchema)
// const Fauna = model('Fauna', faunaSchema, 'Fauna') // can add extra fauna to not pluralize


module.exports = Favorite
