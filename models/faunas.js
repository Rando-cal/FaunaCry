const mongoose = require('./connections.js')

// NEED TO ADD OTHER SCHEMAS IF INTERACTING

const { Schema, model } = mongoose

const faunaSchema = new Schema (

    {

        commonName: String,
        sciName: String,
        speciesStatus: String,
        speciesImage: String,
        speciesState: String,
        speciesFips: Number,
        speciesCounty: String,
        speciesCountry: String


        // needs to ref favorites here and other relationships

    },

    {

        timestamps:true
    }

)

// collection will be called faunas
// this is compiling the model
const Fauna = model('Fauna', faunaSchema)

module.export = Fauna