const Rule = require('../models/Rule');
const { ensureAuth } = require('../config/auth');

module.exports = (app) => {
    app.get('/api/rules', (req, res) => {
        console.log("Pegando rules...");
        Rule.find({}).
            populate('user').
            exec((err, rules) => {
                if (err)
                    throw err;
                res.send(rules);
            });
    });
    // TODO: Colocar aqui na chamada o username

    app.post('/api/rules', ensureAuth, (req, res) => {
        Rule.create(req.body, (err) => {
            if(err) {
                console.log("Error creating new rule! ", err);
                return handleError(err);
            }
        })

    });

    app.delete('/api/rules', ensureAuth, (req, res) => {
        Rule.findByIdAndDelete(req.body.id, (err, res) => {
            if(err){
                console.log("error deleting rule");
                return handleError(err);
            }
        })
    })
}