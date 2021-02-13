//requiring packages
const express = require("express");
const mongoose = require("mongoose");
const compression = require("compression");
const logger = require("morgan");


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
    res.sendFile('./index.html');
})

//seed data
const seedWorkout =[
    {
        name: "yoga",
        kind: "stretch",
        weight: 0,
        reps: 0,
        sets: 0,
        cardio: false,
        duration: 30
    },
    {
        name: "running",
        kind: "outside",
        weight: 0,
        reps: 0,
        sets: 0,
        cardio: true,
        duration: 30
    },
    {
        name: "bicep curls",
        kind: "easy",
        weight: 15,
        reps: 10,
        sets: 4,
        cardio: false,
        duration: 30
    }
   
]
app.get("/seed", (req, res) => {
    db.Exercise.create(seedWorkout)
    .then(result => {
        console.log(result)
        db.Workout.create([
            {
                name: "workout 1",
                exercises: [
                    result[Math.floor(Math.random()* result.length)]._id
                ]
            },
            {
                name: "workout 2",
                exercises: [
                    result[Math.floor(Math.random()* result.length)]._id
                ]
            },
            {
                name: "workout 3",
                exercises: [
                    result[Math.floor(Math.random()* result.length)]._id
                ]
            },
        ])
        .then(fullRes => {
            res.send(fullRes)
        })
        .catch(err => {
            res.send(err)
        })
    })
    .catch(err => {
        res.send(err)
    })
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
    .populate('exercise')
    .then(dbWorkout => {
        res.json(dbWorkout)
    })
    .catch(err =>{
        console.log(err)
        res.send(err)
    })
})


app.post("/api/workouts", ({ body }, res) => {
db.Workout.create(body)
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