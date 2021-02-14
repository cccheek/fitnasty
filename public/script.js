
function renderExercisePlans() {
    $("#workouts").empty();
    $.ajax({
        url: "/populatedexercises",
        method: "GET",
    })
        .then(dbData => {
            // console.log(dbData)
            dbData.forEach(plan => {
                console.log(plan)
                //make a new div each workout
                const newDiv = $("<div>", {
                    style: "width 25%; border: 2px solid black",
                })
                const title = $("<h3>", {
                    text: plan.name
                })
                const newUl = $("<ul>", { text: "Exercise!" })
                newDiv.append(title)


                //loop through exercise and print each
                plan.exercises.forEach(exercise => {
                    console.log(exercise)
                    const newLi = $("<li>", {
                        text: `Name ${exercise.name}\nKind: ${exercise.kind}\nWeight: ${exercise.weight}\nReps: ${exercise.reps}\nSets: ${exercise.sets}\nCardio: ${exercise.cardio ? "Yes" : "No"}\nDuration: ${exercise.duration}`
                    })
                    newUl.append(newLi);
                })

                //form to add new exercises to workout
                const newForm = $("<form>", {
                    id: plan._id
                })
                const newBtn = $("<button>", {
                    text: "Add to Workout",
                    class: "update-btn",
                    "data-id": plan._id
                })
                const nameInput = $("<input>", {
                    type: "text",
                    id: `name-${plan._id}`,
                    placeholder: "Name of Exercise"
                })
                const kindInput = $("<input>", {
                    type: "text",
                    id: `kind-${plan._id}`,
                    placeholder: "Kind of Exercise"
                })
                const weightLabel = $("<label>", {
                    for: `weight-${plan._id}`,
                    text: "How much weight used?"
                })
                const weightInput = $("<input>", {
                    type: "number",
                    id: `weight-${plan._id}`
                })
                const repsLabel = $("<label>", {
                    for: `reps-${plan._id}`,
                    text: "How many reps done?"
                })
                const repsInput = $("<input>", {
                    type: "number",
                    id: `reps-${plan._id}`
                })
                const setsLabel = $("<label>", {
                    for: `sets-${plan._id}`,
                    text: "How many sets done?"
                })
                const setsInput = $("<input>", {
                    type: "number",
                    id: `sets-${plan._id}`
                })
                const cardioLabel = $("<label>", {
                    for: `cardio-${plan._id}`,
                    text: "Was this cardio?"
                })
                const cardioInput = $("<input>", {
                    type: "checkbox",
                    id: `cardio-${plan._id}`
                })
                const durationLabel = $("<label>", {
                    for: `duration-${plan._id}`,
                    text: "How long?"
                })
                const durationInput = $("<input>", {
                    type: "number",
                    id: `duration-${plan._id}`
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

                $("#workouts").append(newDiv)
            })
        })
}
renderExercisePlans();

$("#new-workout").on("submit", (event) => {
    event.preventDefault();
    const workoutDay = $("#workout-day").val().trim();
    // console.log(workoutDay + " working")
    $.ajax({
        url: "/api/workouts",
        method: "POST",
        data: { name: workoutDay }
    })
        .then(renderExercisePlans())
})

$(".workouts").on("click", ".update-btn", (event) => {
    event.preventDefault();
    const workoutId = event.target.dataset.id;
    console.log(workoutId)
    const name = $(`#name-${workoutId}`).val().trim
    const kind = $(`#kind-${workoutId}`).val().trim
    const weight = parseInt($(`#weight-${workoutId}`).val())
    const reps = parseInt($(`#reps-${workoutId}`).val())
    const sets = parseInt($(`#sets-${workoutId}`).val())
    const cardio = $(`#cardio-${workoutId}`).is(":checked")
    const duration = parseInt($(`#duration-${workoutId}`).val())

    const newObj = {
        name, kind, weight, reps, sets, cardio, duration, workoutId
    }
    console.log(newObj)

    $.ajax({
        url: "/api/exercises",
        method: "POST",
        data: newObj
    })
        .then(dbExercises => {
            console.log(dbExercises)
            renderExercisePlans();
        })
        .catch(err => {
            console.log(err)
        })
})