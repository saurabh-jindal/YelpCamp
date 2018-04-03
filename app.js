var express               = require("express"),
    app                   = express(),
    bodyParser            = require("body-parser"),
    mongoose              = require("mongoose"),
    Campground            = require("./models/campgrounds"),
    seedDB                = require("./seeds");
    Comment               = require("./models/comment"),
    passport              =  require("passport"),
    LocalStrategy         = require("passport-local"),
    User                  = require("./models/user"),
    passportLocalMongoose = require("passport-local-mongoose");

var commentRoutes = require("./routes/comments"),
    campgroundsRoutes = require("./routes/campgrounds"),
    indexRoutes        = require("./routes/index");
    
seedDB();
mongoose.connect("mongodb://localhost/yelpcampV1");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "public"));

app.use(require("express-session")({
    secret: "sab set hai",
    resave:false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(){
    res.locals.currentUser = req.user;
    next();
});

app.use(indexRoutes);
app.use(campgroundsRoutes);
app.use(commentRoutes);



app.listen("3000", () => {
    console.log("started the server at,3000");
});