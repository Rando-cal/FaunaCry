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
mongoose.set('debug',true)

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

// Gets user state input and creates documents based on that
    // pass the search term to the 'show' page for db pull
router.put('/faunas/:X', (req,res) => {
    userInput = req.body.X
    let varToPass = req.body.X
    console.log('varToPass:::$$$::::',varToPass)

    // refine API query to exclude plants
    
    const fetchQuery = process.env.apiUrlFront+req.body.X+process.env.apiUrlBack

    fetch(fetchQuery)
        .then(res =>res.json())

        // .then( (res) => {return console.log( res) } )

        // CAN"T READ res.DATA
        .then( ( res ) => { 
        
            // adding Fetchdata into DB

            // get array of promises written to the DB. use .MAP
            // of res.data
            // array of promices comes from Fauna.create not before

            //try Fauna.insertMany
            return Fauna.insertMany({ 
            
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
                
                // }
                // , function (err,small) {
                //     if (err) return handleError(err)
                //     return
                // })

            })
        })
        
        .then( (response) => {res.redirect(`/faunas/show/${varToPass}`)})

        .catch(err => console.log(err))
})


// RANDOM TESTING function to get Find.query to work
// async function queryIt(stateInput){
//     require('dotenv').config()
//     const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
//     const { response } = require('express');
//     const express = require('express');
//     const req = require('express/lib/request');
//     const { append } = require('express/lib/response');
//     const router = express.Router()
//     const mongoose = require('../models/connections.js')
//     // used FOR DEBUGGIN
//     mongoose.set('debug',true)
//     const Fauna = require('../models/faunas.js')
//     let userInput


//     await Fauna.find("{areaStateFull:"+stateInput+"}")

//     .then(response => {
//         console.log('REPONSE@@',response)

//     })
//     .catch(err =>  { response.json(err)})
//     return response
// }


// ASYNC AWAIT SYNTAX
// outer.get('/faunas/show/:X', async(req,res) => 
// with  await console.log('the full string', "{'areaStateull':'"+stateInput+"'}");



// WILL HAVE TO TEST AFTER ADDING USERS AND LOGINS...
router.get('/faunas/show/:X', (req,res) => {

    let stateInput = req.params.X
    console.log('#############',req.session.userId);

    console.log('getbefore db find:stateInput:',stateInput)
    console.log('the full string', "{'areaStateull':'"+stateInput+"'}");
    
    // believe its getting STOPPED here
    // Fauna.find or faunas.find
    // maybe async issue

    // queryIt(stateInput)   /////  testing


    // DB QUERY - distinct is close but doesn't give the whole doc:
    // db.faunas.distinct('commonName',{'areaStateFull':'Oregon'})   gives all distinct cmn in Oregon

    // older V here
    Fauna.find({areaStateFull: stateInput})  //valid query that works
    // .then(response => {console.log(response)})


    // .then( response => {console.log(response)})

    .then(response => { 
        res.render('./faunas/show.liquid', { response : response } )

        // res.render('./faunas/show.liquid', { response : response } , variable 2)  this is for passing in 2nd var

    }) 
    .catch(err =>  { res.json(err)})
    console.log('bottom of getROUTE');

})



/////  ***** DON'T FORGET **************
module.exports = router