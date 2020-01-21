const cron = require('node-cron');

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
        else{
            console.log("Rule broken! Send mail!");
        }
    });
});


const Rule = require('../models/Rule');

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