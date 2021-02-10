function renderExercise(){
    $("#week").empty();
    $where.ajax({
        url: "/populateexercise",
        method:"GET",
    })
    .then(dbData =>{
        console.log(dbData)
        dbData.forEach(plan => {

            //make a new div each workout
            const newDiv = $("<div>", {
                style:"width 25%; border: 2px solid black",
            })
            const title = $("<h3>", {
                text: plan.name
            })
            const newUl = $("<ul>", {text: "Exercise Done:"})
            newDiv.append(title)


            //loop through exercise and print each
            plan.meal.forEach(exercise => {
                const newLi = $("<li>", {
                    text: `Name ${exercise.name}\nKind: ${exercise.kind}\nWeight: ${exercise.weight}\nReps: ${exercise.reps}\nSets: ${exercise.sets}\nCardio: ${exercise.cardio ? "Yes":"No"}\nDuration: ${exercise.duration}`
                })
                newUl.append(newLi);
            })
            newDiv.append(newUl);
            $("#weeks").append(newDiv);
        })
    })
}
renderExercise();