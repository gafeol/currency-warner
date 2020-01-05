const Rule = require('../models/Rule');
const { ensureAuth } = require('../config/auth');

module.exports = (app) => {
    app.get('/api/rules', (req, res) => {
            Rule.find({}).
                populate('user').
                exec((err, rules)=>{
                if(err)
                    throw err;
                console.log("got rules", rules);
                res.send(rules);
            });
    })

    app.post('/api/rules', ensureAuth, (req, res) => {
        Rule.create(req.body, (err) => {
            if(err) {
                console.log("Error creating new rule! ", err);
                return handleError(err);
            }
        })

    })
}