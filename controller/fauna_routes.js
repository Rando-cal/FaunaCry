// NEED: 
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

const Fauna = require('../models/faunas.js');
const { db } = require('../models/user.js');

let userInput



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
            for(let i = 0; i < 100; i++){

                Fauna.create({ 

                    // i WAS a 0
                
                    commonName: res.data[i][0],
                    sciName: res.data[i][1].value,
                    speciesStatus: res.data[i][2],
                    speciesImage: res.data[i][12].url,
                    speciesFips: res.data[i][3],
                    speciesCounty: res.data[i][4],
                    speciesCountry: res.data[i][8],
                    areaStateShort: res.data[i][5],
                    areaStateFull: res.data[i][6],
                    speciesId: res.data[i][9],
                    owner: ""                  
                })
            }
        })
        
        .then(res.redirect(`/faunas/show/${varToPass}`))

        .catch(err => console.log(err))

// may need to pass in here since the last .then could duplicate
console.log('LEAVING 385========================');
// res.redirect('/faunas/show/:X')


})

//testing 'seed' db.faunas.insertOne({commonName:"beta",sciName:"beta",areaStateFull:"New Jersey"})

router.get('/faunas/show/:X', async (req,res) => {

    let stateInput = req.params.X
    console.log('stateInput#####################',stateInput);




    // WORKING V %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    Fauna.find({areaStateFull: stateInput})
    .then(response => {res.render('./faunas/show.liquid',{  response })})
    .catch( (err) => {console.log(err);})
    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


}) // route end


/////  ***** DON'T FORGET **************
module.exports = router