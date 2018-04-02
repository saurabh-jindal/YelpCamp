var express = require("express");
var router = express.Router();
var Campground = require("../models/campgrounds");

router.get("/campgrounds", (req,res) => {
    Campground.find({}, (err, results) => {
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index",{campgrounds:results});
        }
    });
    // 
});

router.post("/campgrounds", (req,res) => {
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
router.get("/campgrounds/new",(req,res) => {
    res.render("campgrounds/new.ejs");
});

router.get("/campgrounds/:id" ,(req,res) => {
    Campground.findById(req.params.id).populate("comments").exec((err, results) => {
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/show",{campground:results});

        }
    });
}); 
function isLogegdIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
module.exports = router;