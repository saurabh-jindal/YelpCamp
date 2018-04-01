var express = require("express"),
    app     = express(),
 bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campgrounds"),
    seedDB      = require("./seeds");
    // Comments    = require("./models/comments"),
    // User    = require("./models/user");

seedDB();



mongoose.connect("mongodb://localhost/yelpcampV1");


app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");


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
            res.render("index",{campgrounds:results});
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
    res.render("new.ejs");
});

app.get("/campgrounds/:id" ,(req,res) => {
    Campground.findById(req.params.id, (err, results) => {
        if(err){
            console.log(err);
        }else{
            res.render("show",{campground:results});

        }
    });
}); 

app.listen("3000", () => {
    console.log("started the server at,3000");
});