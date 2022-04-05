const path = require('path');
const express = require('express');

const app = express()

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

app.get('/weather', (req, res) => {
    res.send({
        location: "Budapest",
        forecast: "Clear"
    })
})

const port = 3000
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})
