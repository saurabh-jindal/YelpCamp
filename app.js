var express = require("express");
var app = express();
var bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");


var campgrounds = [
    {'name':'salmon creek',image:'https://image.shutterstock.com/display_pic_with_logo/2117717/520119067/stock-photo-friends-camping-eating-food-concept-520119067.jpg'},
    {'name':'saurabh creeds',image:'https://image.shutterstock.com/display_pic_with_logo/2547541/581001244/stock-photo-blured-image-of-camping-and-tent-with-high-iso-grained-picture-under-the-pine-forest-in-sunset-at-581001244.jpg'},
    {'name':'sanorita creedf',image:'https://image.shutterstock.com/display_pic_with_logo/884548/211091626/stock-photo-people-sit-at-night-round-a-bright-bonfire-211091626.jpg'},
];


app.get("/",(req, res) => {
    res.render("landing");
});
app.get("/campgrounds", (req,res) => {
  
    res.render("campgrounds",{campgrounds:campgrounds});
});

app.post("/campgrounds", (req,res) => {
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name:name, image:image};
    campgrounds.push(newCampground);

    res.redirect("/campgrounds");
});
app.get("/campgrounds/new",(req,res) => {
    res.render("new.ejs");
});

app.listen("3000", () => {
    console.log("started the server at,3000");
});