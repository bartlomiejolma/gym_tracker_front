import React, { Component } from "react";
import TrainingExercise from "./trainingExercise";

import { makeStyles } from "@material-ui/core/styles";
import TreeItem from "@material-ui/lab/TreeItem";

const useStyles = makeStyles({
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400,
  },
});

class Training extends Component {

  classes = useStyles();

  render() {
    const { training } = this.props;
    console.log(training);
    return (
      <TreeItem nodeID={training.id} label="Training {training.id} {training.start_time}">
        <h5>Exercises:</h5>
        {training.trainingsExercises.map(trainingExercise => (
          <TrainingExercise
            key={training.id}
            trainingExercise={trainingExercise}
          ></TrainingExercise>
        ))}
      </TreeItem>
    );
  }
}

export default Training;
