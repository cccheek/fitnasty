//requiring packages
const compression = require("compression");
const logger = require("morgan");
const express = require("express");
const mongoose = require("mongoose");


const app = express();
const PORT = process.env.PORT || 8080;

app.use(compression());
app.use(logger("dev"));

//set up express app
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'))

//requiring models folder
const db = require("./models");

//connecting to mongodb
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitnasty", {
useNewUserParser: true,
useFindandModify: false,
useUnifiedTopology: true,
useCreateIndex: true
});

//starter route
app.get("/", (req, res) => {
    // res.send("oh heyyy");
    res.send('./index.html');
})


app.get('/api/exercise', (req, res) => {
    db.Exercise.find({})
    .then(dbExercise => {
        res.json(dbExercise)
    })
    .catch(err =>{
        console.log(err)
        res.send(err)
    })
})

app.get('/api/workout', (req, res) => {
    db.Workout.find({})
    .then(dbWorkout => {
        res.json(dbWorkout)
    })
    .catch(err =>{
        console.log(err)
        res.send(err)
    })
})

app.get('/populateexercise', (req, res) => {
    db.Workout.find({})
    .populate('exercises')
    .then(dbWorkout => {
        res.json(dbWorkout)
    })
    .catch(err =>{
        console.log(err)
        res.send(err)
    })
})




app.listen(PORT, function(){
    console.log("We hear ya on " +PORT);
});