const Rule = require('../models/Rule');
const { ensureAuth } = require('../config/auth');

module.exports = (app) => {
    app.get('/api/rules', (req, res) => {
            Rule.find({}, (err, rules)=>{
                if(err){
                    throw err;
                }
                console.log("got rules", rules);
                res.send(rules);
            });
    })

    app.post('/api/rules', ensureAuth, (req, res) => {
        
    })
}