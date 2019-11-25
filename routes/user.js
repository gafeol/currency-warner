const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { ensureAuth } = require('../config/auth');

module.exports = (app) => {
    app.post('/api/register', (req, res) => {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        bcrypt.genSalt(10, (err, salt) => 
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err;
                newUser.password = hash;
                newUser.save()
                    .then((user) => {
                        res.json({msg: "deu bom", user: user});
                    })
                    .catch(err => console.log(err));
        }));
    });

    app.post('/api/login', (req, res, next) => {
        passport.authenticate('local', {
            successRedirect: '/',
            failureMessage: '/login',
            failureFlash: true
        })(req, res, next);
    });

    app.get('/api/checkToken', ensureAuth, (req, res) => {
        console.log("CHECA TOKEN");
        res.sendStatus(200);
    })

    app.get('/api/logout', (req, res, next) => {
        console.log("LOGOUT")
        req.logout();
        res.redirect('/');
    })
}

