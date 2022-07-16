const mongoose = require("mongoose");
//Database mongoDB
mongoose.connect(
  "mongodb://localhost:27017/quizappDB"
);
//Database Schema
const questSchema = new mongoose.Schema({
    subject: {
      type: String,
      required: [true, "Compulsory field"]
    },
    question: {
      type: String,
      required: [true, "Compulsory field"]
    },
    options :{
      type : [String],
      required : [true, "Options are compulsory"]
    },
    ans: {
      type: Number,
      required: [true, "Compulsory field"]
    
    },
    approve: {
      type: Number,
      required: [true, "Compulsory field"]
    }
  });
  
  // Database Model
  const Quest = mongoose.model("Quest", questSchema);
  module.exports.Quest = Quest;

  
