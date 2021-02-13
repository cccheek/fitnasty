function renderExercise() {
    $("#workouts").empty();
    $.ajax({
        url: "/populateexercise",
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
                plan.exercise.forEach(exercise => {
                    console.log(exercise)
                    const newLi = $("<li>", {
                        text: `Name ${exercise.name}\nKind: ${exercise.kind}\nWeight: ${exercise.weight}\nReps: ${exercise.reps}\nSets: ${exercise.sets}\nCardio: ${exercise.cardio ? "Yes" : "No"}\nDuration: ${exercise.duration}`
                    })
                    newUl.append(newLi);
                })
                newDiv.append(newUl);
                $("#workouts").append(newDiv);
            })
        })
}
renderExercise();

$("#new-workout").on("submit", (event) => {
    event.preventDefault();
    const workoutDay = $("#workout-day").val().trim();
    // console.log(workoutDay + "working")
    $.ajax({
        url: "/api/workouts",
        method: "POST",
        data: { name: workoutDay }
    }).then(renderExercise())
})