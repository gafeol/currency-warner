const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Import home routes
require('./routes/home.js')(app)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Running on " + PORT);
})