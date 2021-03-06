const app = require('express')();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const passport = require('passport');

require('./config/passport')(passport);
// Express session
app.use(session({
    secret: 'papa',
    resave: true,
    saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./jobs/cron.js')

require('./routes/home.js')(app)
require('./routes/user.js')(app)
require('./routes/rules.js')(app)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

var dbURI = process.env.dbURI;
if(!dbURI){
    try{
        const keys = require('./config/keys');
        dbURI = keys.mongodb.dbURI;
    }
    catch (e) {
        console.log("Not able to require keys file");
    }
}

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("Connected to mongodbLab");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Running on " + PORT);
})