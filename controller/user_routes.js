const User = require('../models/user.js')
const bcrypt = require('bcryptjs')
const express = require('express')
const methodOverride = require('method-override')
// const connect = require('connect-mongo')

// Make router
const router = express.Router()


//==========================================================================

router.get('/', (req,res) => {
    res.redirect('/users/login')
})

router.get('/signup',  (req,res) => {
    res.render('../views/users/signup.liquid')
})


router.post('/signup', async (req,res) => {
    req.body.password = await bcrypt.hash(
        req.body.password,
        await bcrypt.genSalt(10)
    )

    User.create(req.body)
        .then(user => {
            res.redirect('/users/login')
        })

        .catch(error => {res.json(error)})


})

router.get('/login', (req,res) => {
    res.render('users/login')
})

// CAREFULL OF .then AND ASYNC. This differs from fruits now
router.post('/login', async (req,res) => {
    const { username, password } = req.body
    console.log('username::==>>>',username)
    console.log('password::=======>>>',password);

    User.findOne({ username })
        .then( (user) => {
            if (user) {
                const result = bcrypt.compare(password, user.password)

                if (result) {
                    req.session.username = username
                    req.session.loggedIn = true
                    req.session.userId = user._id
                    res.redirect('/faunas')
                } else{
                    res.json({ error: 'Username or password incorrect' })
                }
            } else {res.json({ error: 'User does not exist'})
        
            }
        })

        .catch(error => {
            console.log(error)
            res.json(error)
        })

})


router.get('/logout', (req,res) => {
    res.render('../views/users/logout.liquid')
})

router.post('/logout', (req,res) => {
    req.session.destroy(ret => {
        console.log('This is returned from req.session.destroy', ret)
        console.log(req.session)
        res.redirect('/faunas')
    })
})

module.exports = router