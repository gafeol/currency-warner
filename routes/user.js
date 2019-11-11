
const app = require('express')();



app.post('/register', (req, res) => {
    console.log(req.body);
})