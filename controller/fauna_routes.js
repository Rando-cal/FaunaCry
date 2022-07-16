require('dotenv').config()

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const { response } = require('express');
const express = require('express');
const req = require('express/lib/request');
const { append } = require('express/lib/response');

const router = express.Router()

const mongoose = require('../models/connections.js')

const Fauna = require('../models/faunas.js')

let userInput


const downloadToFile = (content, filename, contentType) => {
    const a = document.createElement('a');
    const file = new Blob([content], {type: contentType})
    
    a.href= URL.createObjectURL(file)
    a.download = filename;
    a.click();

    URL.revokeObjectURL(a.href)
}

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






router.put('/faunas/:X', (req,res) => {
    userInput = req.body.X
    console.log(req.body);

    // refine API query to exclude plants
    
    const fetchQuery = process.env.apiUrlFront+req.body.X+process.env.apiUrlBack

    fetch(fetchQuery)
        .then(res =>res.json())

        .then( ( res ) => { 
        
        // adding Fetchdata into DB
        Fauna.create( { 
        
            commonName: res.data[0][0],
            sciName: res.data[0][1].value,
            speciesStatus: res.data[0][2],
            speciesImage: res.data[0][12].url,
            speciesFips: res.data[0][3],
            speciesCounty: res.data[0][4],
            speciesCountry: res.data[0][8],
            areaStateShort: res.data[0][5],
            areaStateFull: res.data[0][6],
            speciesId: res.data[0][9] 
            
            }, function (err,small) {
                if (err) return handleError(err)
                return
            })

        })

        .catch(err => console.log(err))

// may need to pass in here since the last .then could duplicate
console.log('LEAVING 112========================');
res.redirect('/faunas/show/:X')

})

// WILL HAVE TO TEST AFTER ADDING USERS AND LOGINS...
router.get('/faunas/show/:X', (req,res) => {
    // query var is userInput

    Fauna.find({userInput})
    .then(response => { 
        res.render('./faunas/show.liquid', { response : response })
    })
    .catch(err =>  { res.json(err)})

})



/////  ***** DON'T FORGET **************
module.exports = router