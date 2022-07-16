const express = require("express");
const app = express();
const bodyParser = require("body-parser");

//Import database model
const db = require(__dirname + "/mongoDB.js");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(express.static("public"));


app.route("/")
   .get((req,res)=>{
    res.render("home");
   })

app.route("/addQuestion")
   .get((req,res)=>{
    res.render("addQuestion");
   })

app.route("/addQuestion")

   .get((req,res)=>{
    res.render("addQuestion");
   })

   .post((req,res)=>{
    console.log(req.body);
    var SUBJECTS = req.body.subjects;
    var QUESTION = req.body.questions;
    var OPT1 = req.body.option1;
    var OPT2 = req.body.option2;
    var OPT3 = req.body.option3;
    var OPT4 = req.body.option4;
    var APPROVE = 0;
    var ANSWER = req.body.flexRadioDefault;

    const newQuest = new db.Quest({
      subject: SUBJECTS,
      question: QUESTION,
      options: [OPT1,OPT2,OPT3,OPT4],
      ans: ANSWER,
      approve: APPROVE
    });
    newQuest.save(function(err){
      if(err){
        console.log(err);
      }else{
        res.redirect("/addQuestion");
      }
    });
   });

app.route("/adminLogin")
   .get((req,res)=>{
    res.render("adminLogin");
   })

app.route("/login")
   .get((req,res)=>{
    res.render("login");
   })


app.route("/studentDashboard")
   .get((req,res)=>{
    res.render("studentDashboard");
   })

app.route("/teacherDashboard")
   .get((req,res)=>{
    res.render("teacherDashboard");
   })

app.route("/downloadQuestion")
   .get((req,res)=>{
    res.render("downloadQuestion");
   })


app.listen(3000, function () {
  console.log("Server is live on :" + "http://localhost:3000/");
});
