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


router.get('/faunas/:locationInfo', (req,res) => {
    console.log('IN GET');
    console.log("!!!"+ process.env.apiUrlFront+req.params+process.env.apiUrlBack)
    fetch(process.env.apiUrlFront+"Idaho"+process.env.apiUrlBack)
        .then(console.log("in fetch"))
        .then(res =>{console.log(res)})
        .catch(err => {console.log(err)})
        res.render('faunas/show.liquid')
})



router.get('/faunas', (req,res) => {
    res.render('./faunas/index.liquid')
})



/////  ***** DON'T FORGET **************
module.exports = router