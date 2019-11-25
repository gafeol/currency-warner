module.exports = {
    ensureAuth: (req, res, next) => {
        if(req.isAuthenticated())
            return next();
        res.redirect(401, '/login'); // Usei Unauthorized
    }
}