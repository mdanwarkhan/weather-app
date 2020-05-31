const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)

app.get('' , (req,res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Anwar Khan'
    })
})

app.get('/about' , (req,res) => {
    res.render('about', {
        title: 'About me',
        name: 'Anwar'
    })
})

app.get('/help' , (req,res) => {
    res.render('help', {
        title: 'Help by me',
        name: 'Khan'
    })
})

//addede comment lines
// route url 
// app.get('', (req, res) => {
//    res.send('<h1>express<h1>')
// })

// app.get('/help', (req, res) => {
//     res.send({
//         name: 'Anwar',
//         age: 24
//     })
//  })

//  app.get('/about', (req, res) => {
//     res.send('<h1>express<h1>')
//  })

//  app.get('/weather', (req, res) => {
//     res.send({
//         forecast: 'Clear sky',
//         location: 'Bengaluru'
//     })
//  })
app.get('/help/*', (req,res) => {
    res.render('404', {
        title: 404,
        name: 'anwar khan',
        errorMessage: 'Help article not found'
    })
})


app.get('/products', (req,res) => {
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location}) => {
        if(error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error})
            }
            
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: 404,
        name: 'anwar khan',
        errorMessage: 'Page not found'
    })
})


// start the server 
app.listen(port, () =>{
    console.log('Server is up on port 3000')
})