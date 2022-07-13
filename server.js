require('dotenv').config()
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const faunaRoutes = require('./controller/fauna_routes.js')


// express app object
const app = require('liquid-express-views')(express())

// MIDDLEWARE
app.use(morgan('tiny'))
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false}))
app.use(express.static('public'))

const session = require('express-session')
const MongoStore = require('connect-mongo')

app.use(
        session({
            secret: process.env.SECRET,
            store: MongoStore.create({
                mongoUrl: process.env.DATABASE_URI
            }),
            saveUninitialized: true, // ??
            resave: false // ??
        })
)

// ROUTES    *** WATCH FOR ROUTE ORDER ***
// app.get('/', (req,res) => {  /// DO i need this??
//     res.redirect('/faunas')
// })

// basic route for sanity check
// app.get('/', (req,res) => {
//     res.render('./faunas/index.liquid')
// })

// this worked with / vs /faunas. I think fauna_routes.js 
    //fills in the fauna in /fauna part
app.use('/', faunaRoutes)  
// need user-routes and others here




const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`App is listening on port: ${PORT}`)
})