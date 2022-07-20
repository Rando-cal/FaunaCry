// NEED: 
// to add multiple entries from api fetch into DB
// a way to remove duplicates in my db query
// a way to add favorites to My Faunas
// a way to trigger a route without redirecting
// error pages for logins, logout, sigunps...


require('dotenv').config()

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const { response } = require('express');
const express = require('express');
const req = require('express/lib/request');
const { append } = require('express/lib/response');

const router = express.Router()

const mongoose = require('../models/connections.js')

// used FOR DEBUGGIN
// mongoose.set('debug',true)

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

// // jsonData.data[0]                         first animal item
// // jsonData.data[1]                         second animal item
// // jsonData.data[0][0]                      common name
// // jsonData.data[0][1].value                scientific name
// // jsonData.data[0][2]			            status
// // jsonData.data[0][12].url		            image URL



///=============================  ROUTES ========================================================
//================================================================================================

router.get('/faunas', (req,res) => {
    res.render('./faunas/index.liquid')
})



//  ATTEMPT 4 to get it back working ================================

router.put('/faunas/:X', (req,res) => {
    userInput = req.body.X
    let varToPass = req.body.X
    console.log('varToPass:::$$$::::',varToPass)

    // refine API query to exclude plants
    
    const fetchQuery = process.env.apiUrlFront+req.body.X+process.env.apiUrlBack

    fetch(fetchQuery)
        .then(res =>res.json())

        .then( ( res ) => { 
        
            // console.log('LENGTH$$$',res.data[0].length);

            //try to add more db entries
            // for(let i = 0; i < res.data[0].length; i++){


                return Fauna.create({ 
                
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


                })





        })
        
        .then(res.redirect(`/faunas/show/${varToPass}`))

        .catch(err => console.log(err))

// may need to pass in here since the last .then could duplicate
console.log('LEAVING 385========================');
// res.redirect('/faunas/show/:X')


})

//testing 'seed' db.faunas.insertOne({commonName:"beta",sciName:"beta",areaStateFull:"New Jersey"})

router.get('/faunas/show/:X', (req,res) => {

    let stateInput = req.params.X
    console.log('stateInput#####################',stateInput);

        // NOT RETURNING then not SHOWING
    Fauna.find({areaStateFull: stateInput})
    .then(response => {res.render('./faunas/show.liquid',{  response })})
    .catch( (err) => {console.log(err);})

})


/////  ***** DON'T FORGET **************
module.exports = router