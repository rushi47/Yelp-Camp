var mongoose=require("mongoose");
 mongoose.Promise = require('bluebird');

var passportLocalMongoose=require("passport-local-mongoose");

var userSchema=mongoose.Schema({
    
    username:String,
    password:String,
});

userSchema.plugin(passportLocalMongoose);


module.exports=mongoose.model("User",userSchema);