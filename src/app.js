const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000

const app = express()   

// this is in order for us to enable express to serve static files
app.use(express.static(path.join(__dirname, '../public')))

// defining paths
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setting paths
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// render index.hbs
app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Devansh Tandon'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Devansh Tandon'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Devansh Tandon'
    })
})

// we use get to respond to client that tries to get something at a specific route
// .get() takes two args. First is the route, second is a function
// req contains info about incoming request to server
// res is a bunch of methods that lets us customize what we want to send to requester

app.get('/weather', (req, res) => {
    if(!req.query.address ){
        return res.send ({
            errorMessage: 'You must provide an address'
        })
    }
    
    geocode(req.query.address, (error, {Latitude, Longitude, Location} = {}) => {
        if(error)
            return res.send({error})

        forecast(Latitude, Longitude, (error, forecastData) => {
            if(error)
                return res.send({error})
            res.send({
                address: req.query.address,
                location: Location,
                forecast: forecastData
            })
        })
    })
})

// 404 page
app.get('/help/*', (req,res) => {
    res.render('404', {
        title:'404',
        errorMessage: "Help article not found",
        name: 'Devansh Tandon'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title:'404',
        errorMessage: "my 404 page",
        name: 'Devansh Tandon'
    })
})

app.listen(port, () => {
    console.log('Server is running at ' + port)
})