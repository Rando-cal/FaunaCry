const express = require('express')
const req = require('express/lib/request')
const Template = require('liquid/lib/liquid/template.js')
const mongoose = require('../models/connections.js')
const router = express.Router()

// used FOR DEBUGGIN
// mongoose.set('debug',true)

const Fauna = require('../models/faunas.js')
const Favorite = require('../models/favorites.js')
const ObjectId = require('mongodb').ObjectId


// // ========= ROUTES =========


// This is when the user hits the favorite button. Doesn't redirect anywhere but 
// /favorites/:Y
router.post('/:Y', async (req,res) => {

    let faunaId = req.params.Y
    let userInfo = req.session.username

    const filter = { _id : faunaId }
    const update =  { owner : userInfo}

    let docz = await Fauna.findOneAndUpdate(filter, update,{returnOriginal : false })


    res.redirect(`/favorites/show/${faunaId}`)
})


// /favorites/show/:x
router.get('/show/:x', async (req,res) => {
    let faunaId = req.params.x
    let userInfo = req.session.username

    const filter = { owner : userInfo }

    let myFavorites = await Fauna.find(filter)
    
    
    res.render('./favorites/show_favorites.liquid',  {myFavorites})


})


// /favorite/remove/:x
router.delete('/remove/:Y', (req,res) => {

    let faunaId = req.params.Y
    let userInfo = req.session.username

    const filter = { _id : faunaId }
    const update =  { owner : userInfo}

    // let docz = await Fauna.remove({filter})


Fauna.deleteOne(filter, function (err) {
    if (err) return handleError(err);
});


    res.redirect(`/favorites/show/${faunaId}`)
})






//!!!!!!!!!!!!!!!!!!! PUT IN ALL ROUTES !!!!!!!!!!!!!!!!!!!!!!
module.exports = router
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!