const path = require('path');
const express = require('express');
const hbs = require('hbs');
const { forecast } = require('./utils/forecast');
const { geocode } = require('./utils/geocode');


const app = express()

// Setup handlebars engine and location
const viewsPath = path.join(__dirname, '../templates/views')
app.set('view engine', 'hbs')
app.set('views', viewsPath)
const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)


// Setup static directory
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath))

// app.get('', (req, res) => {
//     res.send('Hello Express!')
// })

// app.get('/help', (req, res) => {
//     res.send('Help page')
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1><br>About page')
// })

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'naroslife'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'naroslife'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address!"
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        } else {
            forecast(latitude, longitude, location, (error, forecast) => {
                if (error) {
                    return res.send({error})
                }
                res.send({
                    forecast,
                    location,
                    address: req.query.address
                })
            })
    
        }
    });
})

app.get('products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term!"
        })
    }
    console.log(req.query.search);
    res.send({
        products: [] 
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {errorMessage: "Help article not found!", name: "naroslife", title:"404"})
})

// * get has to come last
app.get('*', (req, res) => {
    res.render('404', {errorMessage: "Page not found!", name: "naroslife", title:"404"})
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})
