function renderExercise() {
    $("#workouts").empty();
    $.ajax({
        url: "/populateexercise",
        method: "GET",
    })
        .then(dbData => {
            // console.log(dbData)
            dbData.forEach(exercises => {
                console.log(exercises)
                //make a new div each workout
                const newDiv = $("<div>", {
                    style: "width 25%; border: 2px solid black",
                })
                const title = $("<h3>", {
                    text: exercise.name
                })
                const newUl = $("<ul>", { text: "Exercise!" })
                newDiv.append(title)


                //loop through exercise and print each
                exercises.exercise.forEach(exercise => {
                    console.log(exercise)
                    const newLi = $("<li>", {
                        text: `Name ${exercise.name}\nKind: ${exercise.kind}\nWeight: ${exercise.weight}\nReps: ${exercise.reps}\nSets: ${exercise.sets}\nCardio: ${exercise.cardio ? "Yes" : "No"}\nDuration: ${exercise.duration}`
                    })
                    newUl.append(newLi);
                })
                
                //form to add new exercises to workout
                const newForm = $("<form>", {
                    id: exercises._id
                })
                const newBtn = $("<button>", {
                    text: "Add to Workout",
                    class:"update-btn",
                    "data-id": exercise._id
                })
                const nameInput = $("<input>", {
                    type: "text",
                    id: `name-${exercise._id}`,
                    placeholder: "Name of Exercise"
                })
                const kindInput = $("<input>", {
                    type: "text",
                    id: `kind-${exercise._id}`,
                    placeholder: "Kind of Exercise"
                })
                const weightLabel = $("<label>", {
                    for: `weight-${exercise._id}`,
                    text: "How much weight used?"
                })
                const weightInput = $("<input>", {
                    type: "number",
                    id: `weight-${exercise._id}`
                })
                const repsLabel = $("<label>", {
                    for:`reps-${exercise._id}`,
                    text: "How many reps done?"
                })
                const repsInput = $("<input>", {
                    type: "number",
                    id: `reps-${exercise._id}`
                })
                const setsLabel = $("<label>", {
                    for:`sets-${exercise._id}`,
                    text: "How many sets done?"
                })
                const setsInput = $("<input>", {
                    type: "number",
                    id: `sets-${exercise._id}`
                })
                const cardioLabel = $("<label>", {
                    for:`cardio-${exercise._id}`,
                    text: "Was this cardio?"
                })
                const cardioInput = $("<input>", {
                    type: "checkbox",
                    id: `cardio-${exercise._id}`
                })
                const durationLabel = $("<label>", {
                    for:`duration-${exercise._id}`,
                    text: "How long?"
                })
                const durationInput = $("<input>", {
                    type: "number",
                    id: `duration-${exercise._id}`
                })
                 
                
                newForm
                .append(nameInput)
                .append(kindInput)
                .append(weightLabel)
                .append(weightInput)
                .append(repsLabel)
                .append(repsInput)
                .append(setsLabel)
                .append(setsInput)
                .append(cardioLabel)
                .append(cardioInput)
                .append(durationLabel)
                .append(durationInput)
                .append(newBtn)
                newDiv.append(newUl).append(newForm);


                $("#workouts").append(newDiv);
            })
        })
}
renderExercise();

$("#new-workout").on("submit", (event) => {
    event.preventDefault();
    const workoutDay = $("#workout-day").val().trim();
    // console.log(workoutDay + " working")
    $.ajax({
        url: "/api/workouts",
        method: "POST",
        data: { name: workoutDay }
    }).then(renderExercise())
})

$(".workouts").on("click", ".update-btn", (event) => {
    event.preventDefault();
    const id = event.target.dataset.id;
    console.log(id)
    const name = $(`#name-${id}`).val().trim
    const kind = $(`#kind-${id}`).val().trim
    const weight = parseInt($(`#weight-${id}`).val())
    const reps = parseInt($(`#reps-${id}`).val())
    const sets = parseInt($(`#sets-${id}`).val())
    const cardio = $(`#cardio-${id}`).is(":checked")
    const duration = parseInt($(`#duration-${id}`).val())

    const newObj = {
        name, kind, weight, reps, sets, cardio, duration, id
    }
    console.log(newObj)

    $.ajax({
        url: "/api/workouts",
        method: "POST",
        data: newObj
    })
    .then(dbExercise =>{
        console.log(dbExercise)
        renderExercise();
    })
    .catch (err => {
        console.log(err)
    })
})