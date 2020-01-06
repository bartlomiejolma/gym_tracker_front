import React, { Component } from "react";
import Training from "./training";

import { makeStyles } from "@material-ui/core/styles";
import { TreeView } from '@material-ui/lab';
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";



class Trainings extends Component {
  state = {
    isLoading: true,
    trainings: [
      { id: 1, date: "2019-09-09 21:23" },
      { id: 2, date: "2019-09-07 20:20" }
    ]
  };
  componentDidMount() {
    fetch("http://localhost:3000/exercises")
      .then(res => res.json())
      .then(json => {
        const exercises = json.data;
        fetch("http://localhost:3000/trainings")
          .then(res => res.json())
          .then(json => {
            const { data } = json;
            const trainingsRequests = data.map(function(training) {
              return fetch("http://localhost:3000/trainings/" + training.id)
                .then(res => res.json())
                .then(json => {
                  const { data } = json;
                  data.trainingsExercises = data.trainingsExercises.map(
                    trainingExercise => {
                      trainingExercise.exercise =
                        exercises[trainingExercise.exercise_id];
                      return trainingExercise;
                    }
                  );
                  return data;
                });
            });
            Promise.all(trainingsRequests).then(trainings => {
              this.setState({
                trainings: trainings,
                isLoading: false,
                exercises: exercises
              });
            });
          })
          .catch(console.log);
      })
      .catch(console.log);
  }
  render() {
    return (
      <div>
        <h2>Trainings:</h2>
        <TreeView
        //   className={this.classes.root}
        //   defaultCollapseIcon={<ExpandMoreIcon />}
        //   defaultExpandIcon={<ChevronRightIcon />}
        >
          {!this.state.isLoading &&
            this.state.trainings.map(training => (
              <Training key={training.id} training={training} />
            ))}
        </TreeView>
      </div>
    );
  }
}

export default Trainings;
