const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({

    name: {
        type: String,
        trim: true,
        required: "Exercise Name"
    },
    kind: {
        type: String,
        trim: true,
        required: "Kind of Exercise"
    },
    weight: {
        type: Number,
        required: "Weight Used"
    },
    reps: {
        type: Number,
        required: "Reps Done"
    },
    sets: {
        type: Number,
        required: "Sets Done"
    },
    cardio: {
        type: Boolean,
        required: "Was it Cardio?"
    },
    duration: {
        type: Number,
        required: "How long did you go?"
    }

})

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;
