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
//================================================================================================

router.get('/faunas', (req,res) => {
    res.render('./faunas/index.liquid')
})

// V3 &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// router.put('/faunas/:X', async (req,res) => {

//     let varToPass = req.body.X

//     const fetchQuery = process.env.apiUrlFront+req.body.X+process.env.apiUrlBack

//     async function doFetch() {
//         try {
//             const response = await fetch(fetchQuery);
    
//             if (!response.ok) {
//             throw new Error(`Error! status: ${response.status}`);
//             }
    
//             const result = await response.json()

//             return result;


//         } catch (err) {
//             console.log(err);
//         }
//     }

//     console.log('===========OUTSIDE doFetch===================================================');
    
//     const fetchData = await doFetch()

//     console.log('fetchData.data[0]',fetchData.data[0][0])
//     console.log('fetchData.data[0][1].value',fetchData.data[0][1].value)
//     console.log('fetchData.data[0][2]',fetchData.data[0][2])
//     console.log('fetchData.data.length',fetchData.data.length)


//     async function doCreate(fetchData) {

//         try {

//             // for (let i = 0; i < fetchData.data.length; i++){
//             Fauna.create({ 
            
//                 commonName: fetchData.data[0][0],
//                 sciName: fetchData.data[0][1].value,
//                 speciesStatus: fetchData.data[0][2],
//                 speciesImage: fetchData.data[0][12].url,
//                 speciesFips: fetchData.data[0][3],
//                 speciesCounty: fetchData.data[0][4],
//                 speciesCountry: fetchData.data[0][8],
//                 areaStateShort: fetchData.data[0][5],
//                 areaStateFull: fetchData.data[0][6],
//                 speciesId: fetchData.data[0][9]

//             })
//             // } // for loop
    
//             if (!response.ok) {
//             throw new Error(`Error! status: ${response.status}`);
//             }
    
//             // const res = await response.json()          

//             return 


//         } catch (err) {
//             console.log(err);
//         }
//     }

//     await doCreate(fetchData)

// res.redirect(`/faunas/show/${varToPass}`)  

// }) // router.put



// V3 &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

        
            // adding Fetchdata into DB

            // get array of promises written to the DB. use .MAP
            // of res.data
            // array of promices comes from Fauna.create not before

            // try Fauna.insertMany


            // THIS WAS WORKING *****
            // return Fauna.create({ 
            
            //     commonName: res.data[0][0],
            //     sciName: res.data[0][1].value,
            //     speciesStatus: res.data[0][2],
            //     speciesImage: res.data[0][12].url,
            //     speciesFips: res.data[0][3],
            //     speciesCounty: res.data[0][4],
            //     speciesCountry: res.data[0][8],
            //     areaStateShort: res.data[0][5],
            //     areaStateFull: res.data[0][6],
            //     speciesId: res.data[0][9]

            //************** */
                
                // }
                // , function (err,small) {
                //     if (err) return handleError(err)
                //     return
                // })

        //     })
        // })
        

        // working code ^^^^^^^^^^^^^^
        // .then( (response) => {res.redirect(`/faunas/show/${varToPass}`)})
        // .catch(err => console.log(err))    })
        // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^




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

// NEW PUT for faunas/show
// router.put('/faunas/show/:X', async (req,res) => {

//     const fetchQuery = process.env.apiUrlFront+req.body.X+process.env.apiUrlBack
//     console.log('fetchQuery')

//     async function getAnimalFetch(fetchQuery) {
//         try {
//             const response = await fetch(fetchQuery)
    
//             if (!response.ok){
//                 throw new Error(`Error! status: ${response.status}`)
//             }
    
//             const result = await response.json()
//             return result
    
//         } catch (err) {
//             console.log(err);
//         }
//     }
    
//     const zipFetch = await getAnimalFetch(fetchQuery)
//     res.render('./faunas/show.liquid', { zipFetch } )



    // fetch(fetchQuery)
    
    // .then(response => { 
    //     res.render('./faunas/show.liquid', { response : response } )

    //     // res.render('./faunas/show.liquid', { response : response } , variable 2)  this is for passing in 2nd var

    // }) 
    // .catch(err =>  { res.json(err)})
    // console.log('bottom of getROUTE');

// })









// v3
// WILL HAVE TO TEST AFTER ADDING USERS AND LOGINS...
// router.get('/faunas/show/:X', async (req,res) => {

//     let stateInput = req.params.X

//     // DB QUERY - distinct is close but doesn't give the whole doc:
//     // db.faunas.distinct('commonName',{'areaStateFull':'Oregon'})   gives all distinct cmn in Oregon

//     // older V here

//     async function dbPullforShow(stateInput) {
//         try {
//             const response2 = await Fauna.find({areaStateFull: stateInput})
    
//             if (!response2.ok){
//                 throw new Error(`Error! status: ${response2.status}`)
//             }
    
//             const result = await response2.json()
//             return result
    
//         } catch (err) {
//             console.log(err);
//         }
//     }
    
//     const dbFetchforShow = await dbPullforShow(stateInput)

//     res.render('./faunas/show.liquid', { dbFetchforShow : dbFetchforShow } )
    
// })





//     Fauna.find({areaStateFull: stateInput})  //valid query that works

//     .then(response => { return
//         res.render('./faunas/show.liquid', { response : response } )

//         // res.render('./faunas/show.liquid', { response : response } , variable 2)  this is for passing in 2nd var

//     }) 
//     .catch(err =>  { res.json(err)})
//     console.log('bottom of getROUTE');

// })


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
        
            // adding Fetchdata into DB
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
                
                // }
                // , function (err,small) {
                //     if (err) return handleError(err)
                //     return
                // })

            })
        })
        
        .then(res.redirect(`/faunas/show/${varToPass}`))

        .catch(err => console.log(err))

// may need to pass in here since the last .then could duplicate
console.log('LEAVING 385========================');
// res.redirect('/faunas/show/:X')


})



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