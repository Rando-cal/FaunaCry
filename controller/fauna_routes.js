require('dotenv').config()

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const express = require('express');
const req = require('express/lib/request');

const router = express.Router()

// need to import a fauna model to access DB

///=============================  ROUTES ========================================================


router.get('/faunas/show', (req,res) => {
        res.render('./faunas/show.liquid', {res})
})


router.put('/faunas/X', (req,res) => {
    // console.log('req.body.X=================',req.body.X);
    const fetchQuery = process.env.apiUrlFront+req.body.X+process.env.apiUrlBack
    console.log(fetchQuery);

    fetch(fetchQuery)
        .then(res =>{res.json})
        .then(res => {console.log(res)})
        .catch(err => {console.log(err)})
        
        console.log('END of FETCH============================');
        res.render('./faunas/show.liquid')

})



router.get('/faunas', (req,res) => {
    res.render('./faunas/index.liquid')
})



/////  ***** DON'T FORGET **************
module.exports = router