module.exports = (app) => {
    app.post('/api/register', (req, res) => {
        console.log("REGISTRA", req.body);
    })
}

