var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comment");


var data = [
    {name: "clouds rest", image:"https://pixabay.com/get/e136b80728f31c22d2524518b7444795ea76e5d004b0144397f4c870a6eab1_340.jpg", description:"Clouds are at rest"},
    {name: "Moving van", image:"https://pixabay.com/get/ea37b70d21f0003ed1584d05fb1d4e97e07ee3d21cac104497f2c570aeecb2bc_340.jpg", description:"Clouds are at rest"},
    {name: "Mountain", image:"https://pixabay.com/get/eb35b70b2df6033ed1584d05fb1d4e97e07ee3d21cac104497f2c570aeecb2bc_340.jpg", description:"Clouds are at rest"},
    
];


function seedDB(){
    Campground.remove({},(err) => {
        if(err){
            console.log(err);
        }
        console.log("Removed campgrounds");
            data.forEach(function(seed){
                Campground.create(seed, (err, campground) => {
                    if(err){
                        console.log("error");
                    }else{
                        console.log("campground created");
                        Comment.create({text:"This place is great", auther:"Homer"},(err, comment) => {
                            if(err){
                                console.log(err);
                            }else{
                                campground.comments.push(comment); 
                                campground.save();
                                console.log("created new comment!");
                            }
                            
                        });
                    }
                });
            });
    });
}


module.exports = seedDB;
