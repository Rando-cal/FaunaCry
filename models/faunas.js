const mongoose = require('./connections.js')

// NEED TO ADD OTHER SCHEMAS IF INTERACTING

const { Schema, model } = mongoose

const User = require('./user.js')

const faunaSchema = new Schema (

    {

        commonName: {
            type: String,
            unique: true
        },
        sciName: String,
        speciesStatus: String,
        speciesImage: String,
        speciesState: String, 
        speciesFips: Number,
        speciesCounty: String,
        speciesCountry: String,
        areaStateShort: String,
        areaStateFull: String,
        speciesId: Number,
        // owner: {
        //     type: Schema.Types.ObjectId, // a singlue user _id
        //     ref: 'User' // string of user is how we ref the model
        // }
        owner: String



        // needs to ref favorites here and other relationships

    },

    {
        timestamps:true
    }

)

// collection will be called faunas
// this is compiling the model
const Fauna = model('Fauna', faunaSchema)
// const Fauna = model('Fauna', faunaSchema, 'Fauna') // can add extra fauna to not pluralize

module.exports = Fauna