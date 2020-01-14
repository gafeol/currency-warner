const Rule = require('../models/Rule');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { ensureAuth } = require('../config/auth');

module.exports = (app) => {
    // TODO: Por algum motivo nao consigo fazer dois niveis /api/user/rules
    app.get('/api/userRules', (req, res) => {
        console.log("Bateu nas rules");
        if (req.isAuthenticated()) {
            console.log("User is auth")
            Rule.find({user: req.user.id})
                .exec((err, rules) => {
                    if(err)
                        throw err;
                    console.log("got rules", rules);
                    res.json({rules});
                })
        }
        else{
            console.log("User is not auth")
            res.json([]);
        }
    });

    app.post('/api/register', (req, res) => {
        console.log("Vai registrar usuario")
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
            //failureFlash: true
        })(req, res, next);
    });

    app.get('/api/checkToken', (req, res) => {
        if(req.isAuthenticated())
            res.json({user: req.user});
        else
            res.sendStatus(401);
    });


    app.get('/api/user', ensureAuth, (req, res) => {
        res.json({user: req.user});
    });

    app.get('/api/logout', (req, res, next) => {
        req.logout();
        res.redirect('/');
    });
}

