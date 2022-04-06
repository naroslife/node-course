const path = require('path');
const express = require('express');
const hbs = require('hbs');

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
        name: 'Robert'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Robert'
    })
})

app.get('/weather', (req, res) => {
    console.log(req.query);
    res.send({
        location: "Budapest",
        forecast: "Clear"
    })
})

app.get('products', (req, res) => {
    res.send({
        products: [] 
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {errorMessage: "Help article not found!", name: "Robert", title:"404"})
})

// * get has to come last
app.get('*', (req, res) => {
    res.render('404', {errorMessage: "Page not found!", name: "Robert", title:"404"})
})

const port = 3000
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})
