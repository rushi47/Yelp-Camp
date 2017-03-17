var mongoose= require("mongoose");
var Campground= require("./models/campground");
var Comment= require("./models/comment");


var data=[
    { name:"Cloud Rest",    
      image:"https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg",
      description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec augue nunc, interdum id feugiat in, molestie ac justo. Vestibulum luctus erat pretium fringilla euismod. Nullam faucibus magna non lacus dapibus, sollicitudin porta quam dapibus. In hac habitasse platea dictumst. Vestibulum tincidunt iaculis turpis, sed maximus quam accumsan eu. Quisque aliquet facilisis metus et tincidunt. Cras sed neque rhoncus, pellentesque enim non, faucibus purus."         
    },
    { name:"Dessert",    
      image:"https://farm3.staticflickr.com/2311/2123340163_af7cba3be7.jpg",
      description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec augue nunc, interdum id feugiat in, molestie ac justo. Vestibulum luctus erat pretium fringilla euismod. Nullam faucibus magna non lacus dapibus, sollicitudin porta quam dapibus. In hac habitasse platea dictumst. Vestibulum tincidunt iaculis turpis, sed maximus quam accumsan eu. Quisque aliquet facilisis metus et tincidunt. Cras sed neque rhoncus, pellentesque enim non, faucibus purus."         
    },
    { name:"Canyon Floyd",    
      image:"https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg",
      description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec augue nunc, interdum id feugiat in, molestie ac justo. Vestibulum luctus erat pretium fringilla euismod. Nullam faucibus magna non lacus dapibus, sollicitudin porta quam dapibus. In hac habitasse platea dictumst. Vestibulum tincidunt iaculis turpis, sed maximus quam accumsan eu. Quisque aliquet facilisis metus et tincidunt. Cras sed neque rhoncus, pellentesque enim non, faucibus purus."         
    },
    
    ]


function seedDB(){
    Campground.remove({},function(err){
        //remove campground
        if(err){
        console.log(err);
        }
        console.log("remove campgrounds");    
        // add campground
    data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
            if(err){
                console.log(err);
            }else
                console.log("added campground");
                // create comment
                Comment.create({
                    author:"Homer",
                    text:"It will be great if it would have been internet"
                }, function(err, comment){
                    if(err){
                        console.log(err);
                    }else
                        campground.comments.push(comment);
                        campground.save();
                        console.log("Created comment");
                });
        });    
    });


    });
}


module.exports=seedDB();