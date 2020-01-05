module.exports = {
    ensureAuth: (req, res, next) => {
        //console.log("ensuring auth...")
        if(req.isAuthenticated()){
            //console.log("success in auth, continuing program...");
            return next();
        }
        //console.log("false auth, redirecting to login")
        res.redirect(401, '/login'); // Usei Unauthorized
    }
}