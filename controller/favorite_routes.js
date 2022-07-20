const express = require('express')
const req = require('express/lib/request')
const mongoose = require('../models/connections.js')
const router = express.Router()

// used FOR DEBUGGIN
// mongoose.set('debug',true)

const Fauna = require('../models/faunas.js')
const Favorite = require('../models/favorites.js')


// // ========= ROUTES =========


// This is when the user hits the favorite button. Doesn't redirect anywhere but 
// /favorites/:Y
router.post('/:Y', async (req,res) => {
console.log(req.body);
//     async function getUser() {
        
//         try {
//                 Fauna.

//             if (!response.ok) {
//                 throw new Error(`Error! status: ${response.status}`)
//             }

//             const result = await response.json()
//             return result
            
//         } catch (err) {
//                 console.log(err)
//         }
        
//     }

// await getUser()
//     let varToPass= 'temp'

    res.redirect(`/favorites/show/${varToPass}`)
})

// /favorites/show/:x
router.get('/show/:x', async (req,res) => {
    
    res.render('./favorites/show_favorites.liquid')


})
// favorites/show/

// OLD V
// router.put('/faunas/:X', (req,res) => {
//     userInput = req.body.X
//     let varToPass = req.body.X
//     console.log('varToPass:::$$$::::',varToPass)

        
    // Fauna.find()
    //     .then(res =>res.json())
        
    //     .then(res.redirect(`/faunas/show/${varToPass}`))

    //     .catch(err => console.log(err))

//     res.redirect('/')  
// })



//!!!!!!!!!!!!!!!!!!! PUT IN ALL ROUTES !!!!!!!!!!!!!!!!!!!!!!
module.exports = router
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!