var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comment");


var data = [
    {name: "clouds rest", image:"https://pixabay.com/get/ea35b3092ff7033ed1584d05fb1d4e97e07ee3d21cac104497f2c77ea5edb6bb_340.jpg", description:"Clouds are at rest"},
    {name: "Moving van", image:"https://pixabay.com/get/ea35b3092ff7033ed1584d05fb1d4e97e07ee3d21cac104497f2c77ea5edb6bb_340.jpg", description:"Clouds are at rest"},
    {name: "Mountain", image:"https://pixabay.com/get/ea35b3092ff7033ed1584d05fb1d4e97e07ee3d21cac104497f2c77ea5edb6bb_340.jpg", description:"Clouds are at rest"},
    
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
