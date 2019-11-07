const app = require('express')();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const keys = require('./config/keys')

app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
  
    const path = require('path');
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
  
  }

mongoose.connect(keys.mongodb.dbURI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("connected to mongodbLab");
});

// Import home routes
require('./routes/home.js')(app)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Running on " + PORT);
})