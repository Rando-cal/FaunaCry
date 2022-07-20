require('dotenv').config()
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const morgan = require('morgan')
const methodOverride = require('method-override')
const express = require('express')


const faunaRoutes = require('./controller/fauna_routes.js')
const userRoutes = require('./controller/user_routes')
const favoriteRoutes = require('./controller/favorite_routes.js')


// express app object
const app = require('liquid-express-views')(express())

// MIDDLEWARE
app.use(morgan('tiny'))
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false}))
app.use(express.static('public'))

const session = require('express-session')
const MongoStore = require('connect-mongo').default

app.use(
        session({
            secret: process.env.SECRET,
            store: MongoStore.create({
                mongoUrl: process.env.MONGODB_URI
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
app.use('/users', userRoutes)
app.use('/favorites', favoriteRoutes)

// need user-routes and others here


// this breaks the empty / but when removed, does not block fauanas/show
// app.use('/', (req,res) => {
//     res.redirect('/faunas')

// }) 




const PORT = process.env.PORT
app.listen(process.env.PORT || 3000, () => {
    console.log(`App is listening on port: ${PORT}`)
})
