
var express = require('express'),
passport = require('passport'),
wecomeMessage = 'Welcome to YelpCamp! ';
var router = express.Router();

var User = require('../models/user');


router.get('/', function(req, res) {
    res.render('landing');
  });


//Auth routes

router.get("/register",(req, res) => {
    res.render("register");
});

router.post("/register", (req,res) => {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => {
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");

        });
    
    });
});


// show login form 

router.get("/login",(req,res) => {
    res.render("login");
});

router.post("/login", passport.authenticate("local", {successRedirect: "/campgrounds",failureRedirect:"/login"}), (req,res) => {
    
});
router.get("/logout",(req, res) => {
    req.logout();
    res.redirect("/campgrounds");
});

function isLogegdIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;