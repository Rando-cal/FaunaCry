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