const express = require('express');

const app = express()

app.get('', (req, res) => {
    res.send('Hello Express!')
})

app.get()

const port = 3000
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})