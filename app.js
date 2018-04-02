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




// Campground.create( {
// // 
//     'name':'salmon creek',
// //     image:'https://image.shutterstock.com/display_pic_with_logo/2117717/520119067/stock-photo-friends-camping-eating-food-concept-520119067.jpg',
// //     description:'Very hatway campgrounds'

// // } ,(err, results) => {
// //     if(err){
// //         console.log(err);
// //     }else{
// //         console.log("Newly created campground! ");
// //         console.log(results);
// //     }
// // });
app.get("/",(req, res) => {
    res.render("landing");
});
app.get("/campgrounds", (req,res) => {
    Campground.find({}, (err, results) => {
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index",{campgrounds:results});
        }
    });
    // 
});

app.post("/campgrounds", (req,res) => {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.desc;
    var newCampground = {name:name, image:image, description:desc};
    // campgrounds.push(newCampground);
    Campground.create(newCampground, (err, newly) => {
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds");
        }
    });

    
});
app.get("/campgrounds/new",(req,res) => {
    res.render("campgrounds/new.ejs");
});

app.get("/campgrounds/:id" ,(req,res) => {
    Campground.findById(req.params.id).populate("comments").exec((err, results) => {
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/show",{campground:results});

        }
    });
}); 

// comments routes..
app.get("/campgrounds/:id/comments/new",isLogegdIn,(req,res) => {
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new",{campground:campground});
        }
    });
});
app.post("/campgrounds/:id/comments",isLogegdIn,(req,res) => {
    Campground.findById(req.params.id, function(err, campground){
         if(err){
             console.log(err);
             res.redirect("/campgrounds");
         }else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/"+campground._id);
                }
            });
         }
    });
});


//Auth routes

app.get("/register",(req, res) => {
    res.render("register");
});

app.post("/register", (req,res) => {
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

app.get("/login",(req,res) => {
    res.render("login");
});

app.post("/login", passport.authenticate("local", {successRedirect: "/campgrounds",failureRedirect:"/login"}), (req,res) => {
    
});
app.get("/logout",(req, res) => {
    req.logout();
    res.redirect("/campgrounds");
});

function isLogegdIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen("3000", () => {
    console.log("started the server at,3000");
});