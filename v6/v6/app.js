var express=require("express"),
    app=express(),
    bodyParser = require('body-parser'),
    mongoose=require("mongoose"),
    passport=require('passport'),
    LocalStrategy=require('passport-local');
    
    mongoose.Promise = require('bluebird');
    mongoose.connect("mongodb://127.0.0.1:27017/yelp_camp_v6");
    
    app.use(bodyParser.urlencoded({extended:true}));
    app.set("view engine","ejs");
    app.use(express.static(__dirname+"/public"));
    
    app.use(require("express-session")({
        secret: "Rusty is the dog",
        resave: false,
        saveUninitialized: false
        
    }));
    
    
    

    
    
    
    
    
//========
//models
//===========
    
var   camp=require("./models/campground");
var   comment=require("./models/comment");
var   User=require("./models/user");
var   seed=require("./seed");


//===============
//PASSPORT AUTHENTICATE
//"User" is model which we have imported above and all things are moving around that variable
//==============

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());


    app.use(function(req, res, next){
       res.locals.currentUser = req.user; 
       next();
    });

//==========    
//Routes
//========
    
   



app.get("/",function(req,res){
    res.render("campground/landing");
});

app.get("/campground",function(req,res){
    console.log(req.user);
    camp.find({}, function(err, allcampgrounds){
        if(err){
            console.log("err" + err)
        }
        else{
            res.render("campground/index",{campgrounds: allcampgrounds});
            console.log("rendered /campground");
        }
    })
    
});

app.get("/campground/new",function(req,res){
    res.render("campground/new");
});

app.post("/campground",function(req,res){
    
    
    var name=req.body.name;
    var image=req.body.image;
    var description=req.body.descript;
    
    var campObject={name:name, image:image, description: description};
    
    camp.create(campObject,function(err, camp){
        if(err){
            console.log(err)
        }else{
            res.redirect("/campground");
        }
    })
    
    
});

app.get("/campground/:id",function(req, res){
        
    camp.findById(req.params.id).populate("comments").exec(function(err, foundcamp){
        if(err){
            console.log("error" + err);
        }else{
            
            
            res.render("campground/show",{camp: foundcamp});
            
        }
    });
});



//=================
// COMMENT
//=====================

app.get("/campground/:id/comments/new", isLoggedIn, function(req, res){
    // find campground
    
    camp.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new",{campground: campground});           
        }
    })
});

app.post("/campground/:id/comments", isLoggedIn, function(req, res){
    
    camp.findById(req.params.id,function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campground");
        }
        else{
                comment.create(req.body.comment,function(err, comment){
                     if(err){
                            console.log(err);
                    }else{
                        campground.comments.push(comment);
                        campground.save();
                        res.redirect('/campground/'+ campground._id);
                    }
                 });
            }

    });
});    


//=====================
//AUTHENTICATE
//=======================

app.get("/login", function(req, res){
   res.render("login"); 
});

app.post("/login", passport.authenticate("local",
    {
        
        successRedirect: "/campground",
        failureRedirect: "/login"
    }), function(req, res){

});

//logout

app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});



//register
app.get("/register", function(req, res){
    res.render("register");
});

app.post("/register", function(req, res){
   
    User.register(new User({username:req.body.username}), req.body.password, function(err, user){
       if(err){
           console.log(err);
           return res.render("register");
       } 
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campground");
            console.log("registered");
        });
    });
})

//midleware

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
      return next();
  }
  res.redirect("/login");
}















app.listen(3000,3001 ,function(){
    console.log("Yelp Camp Server started");
});