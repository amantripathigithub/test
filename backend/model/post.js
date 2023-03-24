const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let post = new Schema({
    email: {
      type: String
    },
    
    name: {
      type: String 
    },
   
    
    solved :{
      type: Number
    },
    
    solutions:[{
      solution:{
        type:String
        
      }
    }]
  });

  const post_model = mongoose.model("posts", post);

  module.exports = post_model;
  