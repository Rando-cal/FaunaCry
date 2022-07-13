require('dotenv').config()

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

// ROUTES
app.use('/faunas', faunaRoutes.js)
// need user-routes and others here

app.get('/', (req,res) => {
    res.redirect('/faunas')
})


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`App is listening on port: ${PORT}`)
})