require('dotenv').config()

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const { response } = require('express');
const express = require('express');
const req = require('express/lib/request');

const router = express.Router()

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

const parseIt = (jsonData) => {
    const test = jsonData.data[0][12].url

// jsonData.data[0]                         first animal item
// jsonData.data[1]                         second animal item
// jsonData.data[0][0]                      common name
// jsonData.data[0][1].value                scientific name
// jsonData.data[0][2]			            status
// jsonData.data[0][12].url		            image URL



    console.log(test);

    return jsondata
}





///=============================  ROUTES ========================================================


router.get('/faunas/show', (req,res) => {
        res.render('./faunas/show.liquid', {res})
})


router.put('/faunas/X', (req,res) => {
    // console.log('req.body.X=================',req.body.X);

    // refine query to exclude plants
    const fetchQuery = process.env.apiUrlFront+req.body.X+process.env.apiUrlBack
    console.log(fetchQuery);

    fetch(fetchQuery)
        .then(res =>res.json())
        // .then(parseIt)
        .then((jsonData) => res.render('./faunas/show.liquid', { jsonData : jsonData } ) ) // get out obj to pass to res.render

        .catch(err => console.log(err))
        
        // console.log('END of FETCH============================');
         // how do you pass in object from Fetch?

})



router.get('/faunas', (req,res) => {
    res.render('./faunas/index.liquid')
})



/////  ***** DON'T FORGET **************
module.exports = router