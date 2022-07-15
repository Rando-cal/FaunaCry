require('dotenv').config()

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const { response } = require('express');
const express = require('express');
const req = require('express/lib/request');
const { append } = require('express/lib/response');

const router = express.Router()


const mongoose = require('../models/connections.js')

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



// const Fauna = require('../models/faunas.js')

const downloadToFile = (content, filename, contentType) => {
    const a = document.createElement('a');
    const file = new Blob([content], {type: contentType})
    
    a.href= URL.createObjectURL(file)
    a.download = filename;
    a.click();

    URL.revokeObjectURL(a.href)
}

console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^', Fauna);

//   let text = 'the data to read out'
//   downloadToFile(text, 'my-new-file.txt', 'text/plain');


// need to import a fauna model to access DB

/// ==================  Processing Functions ==============================

// testing
// const parseIt = (jsonData) => {
//     const test = jsonData.data[0][12].url

// // jsonData.data[0]                         first animal item
// // jsonData.data[1]                         second animal item
// // jsonData.data[0][0]                      common name
// // jsonData.data[0][1].value                scientific name
// // jsonData.data[0][2]			            status
// // jsonData.data[0][12].url		            image URL

//     console.log(test);

//     return jsondata
// }

// const somefunction= (response) => {
//     response.field.url
// }

// const addEntriesDB = (jsonData,Fauna) => {
//     Fauna.create( { commonName: jsonData }, function (err,small) {
//         if (err) return handleError(err)
//     })
//     // console.log(Object.keys(jsonData).length)  // gets object length

//     return 

// }


///=============================  ROUTES ========================================================

router.get('/faunas', (req,res) => {
    res.render('./faunas/index.liquid')
})


router.get('/faunas/show', (req,res) => {
        res.render('./faunas/show.liquid', {res})
})


router.put('/faunas/X', (req,res) => {
    // console.log('req.body.X=================',req.body.X);

    // refine query to exclude plants
    const fetchQuery = process.env.apiUrlFront+req.body.X+process.env.apiUrlBack

    fetch(fetchQuery)
        .then(res =>res.json())

        // .then((jsonData) => res.render('./faunas/show.liquid', { jsonData : jsonData } ) ) //// get out obj to pass to res.render
        .then( ( response ) => { 

            Fauna.create( { commonName: response.data[0][0] }, function (err,small) {
                if (err) return handleError(err)
                return
            })

        })
        
        .catch(err => console.log(err))
        
        // console.log('END of FETCH============================');
         // how do you pass in object from Fetch?

        

res.render('faunas/show.liquid')

})
         ///===================== Other option ==================
        //  let charles = new Person({
        //     fullName: 'Charles Brown',
        //     photosURLs: ['https://bit.ly/34Kvbsh'],
        //     yearBorn: 1922,
        //     notes: 'Famous blues singer and pianist. Parents not real.',
        //     mother: alice._id,
        //     father: bob._id,
        //   });

        //   await charles.save();

        






/////  ***** DON'T FORGET **************
module.exports = router