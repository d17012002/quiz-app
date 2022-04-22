const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

//Database mongoDB
mongoose.connect("mongodb+srv://webconnect:webconnect123@cluster0.tnchb.mongodb.net/quizappDB");

const questSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: [true, "Subject is required"],
  },
  question: {
    type: String,
    required: [true, "Question is compulsory"],
  },
  options: {
    type: [String],
    required: [true, "Options are compulsory"],
  },
  ans: {
    type: Number,
    required: [true, "Ans is required"],
  },
  approve: {
    type: Boolean,
    default: false,
  },
  easy: Number,
  medium: Number,
  hard: Number,
  googleId: String,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(
  session({
    secret: "team crowd-quest",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

questSchema.plugin(passportLocalMongoose);
questSchema.plugin(findOrCreate);

const Quest = mongoose.model("Quest", questSchema);
passport.use(Quest.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "661640160025-ism4l87v887auu1cur27n2m13nfgpjb4.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3000/auth/google/teacherDashboard",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    (accessToken, refreshToken, profile, cb) => {
      User.findOrCreate({ googleId: profile.id }, (err, user) => {
        return cb(err, user);
      });
    }
  )
);

app.route("/").get((req, res) => {
  res.render("home");
});

app.route("/login").get((req, res) => {
  res.render("login");
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/login");
  }
);

app
  .route("/addQuestion")
  .get((req, res) => {
    res.render("addQuestion");
  })
  .post((req, res) => {
    if (req.body.submit_btn === "submitQuestion") {
      console.log(req.body);
      const newQuestion = new Quest({
        subject: req.body.subjects,
        question: req.body.question,
        options: [
          req.body.option1,
          req.body.option2,
          req.body.option3,
          req.body.option4,
        ],
        ans: req.body.flexRadioDefault,
        easy: 1,
        medium: 1,
        hard: 1,
      });

      newQuestion.save();
      console.log("New question added to the review list database");
      res.redirect("/teacherDashboard");
    }
  });

app.route("/unitQuestion")
    .get((req, res) => {
        res.render("unitQuestion");
  });
app.route("/biodashboard")
    .get((req, res) => {
        res.render("biodashboard");
  });
app.route("/chemdashboard")
    .get((req, res) => {
        res.render("chemdashboard");
  });
app.route("/mathsdashboard")
    .get((req, res) => {
        res.render("mathsdashboard");
  });
app.route("/phydashboard")
    .get((req, res) => {
        res.render("phydashboard");
  });
app.route("/studentDashboard")
    .get((req, res) => {
        res.render("studentDashboard");
  });

app.route("/teacherDashboard")
    .get((req, res) => {
        res.render("teacherDashboard");
  });
app.route("/adminLogin")
    .get((req, res) => {
        res.render("adminLogin");
  });

app.route("/auth/google/teacherDashboard").get((req, res) => {
  res.redirect("/studentDashboard");
});

app.listen(3000, function () {
  console.log("Server is live on :" + "http://localhost:3000/");
});
