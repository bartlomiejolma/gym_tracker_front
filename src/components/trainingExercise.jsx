import React from "react";

const TrainingExercise = props => (
  <div>
    <h4>exercise:{props.trainingExercise.exercise.name}</h4>
    <h4>weight:{props.trainingExercise.weight}</h4>
    <h4># repetitions:{props.trainingExercise.no_repetitions}</h4>
    <h4># series:{props.trainingExercise.no_series}</h4>
  </div>
);

export default TrainingExercise;
