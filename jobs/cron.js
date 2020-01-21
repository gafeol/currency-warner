const cron = require('node-cron');
const sendgrid = require('sendgrid');
const Rule = require('../models/Rule');

cron.schedule('0 12 * * *', async () => {
    const rules = await getRules();
    console.log("Rules ja ta aqui ", rules);
    rules.forEach(async rule => {
        const {origCurr, destCurr, thresholdValue} = rule;
        const rate = await getRates(origCurr, destCurr);
        console.log("threshold ", thresholdValue, "rate ", rate);
        if(thresholdValue < rate){
            console.log("Rule not broken");
        }
        else {
            console.log("Rule broken! Send mail!");
            var helper = sendgrid.mail;
            var from_email = new helper.Email("warner@currwarner.com");
            var to_email = new helper.Email(rule.user.email);
            var subject = `${origCurr} is down!`;
            var content = new helper.Content('text/plain', `Hi, Currency Warner here!\n\nThis is the time to buy ${origCurr} since it is worth only ${rate} ${destCurr} (< ${thresholdValue}).\n\nCheers,\nCurrency Warner team`);
            var mail = new helper.Mail(from_email, subject, to_email, content);
            var sg = sendgrid(process.env.SENDGRID_API_KEY);
            var request = sg.emptyRequest({
                method: 'POST',
                path: '/v3/mail/send',
                body: mail.toJSON(),
            });
            sg.API(request, function (error, response) {
                if(error){
                    console.log("Error enviando email ", error);
                }
                else{
                    //console.log(response.statusCode);
                    //console.log(response.body);
                    //console.log(response.headers);
                    Rule.findByIdAndDelete({_id: rule._id})
                    .then(() => {
                        console.log("Rule deleted! ", rule);
                    })
                }
            });
        }
    });
});



const getRules = async () => {
    try {
        return await Rule.find({}).populate('user');
    }
    catch (err){
        console.log("Error ", err);
    }
}

const axios = require('axios');

const getRates = async (origCurr, destCurr) => {
    try {
        const res = await axios.get(`https://api.exchangeratesapi.io/latest?base=${origCurr}&symbols=${destCurr}`)
        return res.data.rates[destCurr];
    } catch(err)   {
        console.log("Get rates error", err);
    }
}