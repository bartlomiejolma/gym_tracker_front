import React, { useState, useEffect } from "react";
import Training from "./training";

import { makeStyles } from "@material-ui/core/styles";
import { TreeView } from '@material-ui/lab';
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";

import * as URL from "../urls"

async function getExercises() {
  return fetch(URL.EXERCISES)
  .then(res => res.json())
  .then(json => json.data)
  .catch(console.log("error fetching exercises"));
}

async function getTrainings() {
  return fetch(URL.TRAININGS)
  .then(res => res.json())
  .then(json => json.data)
  .catch(console.log("error fetching trainings"));
}

function loadTrainings (setTrainings, setExercises, setIsLoading) {

  getExercises()
  .then(exercises => {
    setExercises(exercises)
    getTrainings()
        .then(trainings => {
          console.log(trainings)
          console.log(exercises)
          const trainingsRequests = trainings.map(function(training) {
            return fetch(`${URL.TRAININGS}/${training.id}`)
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
            setTrainings(trainings)
            setIsLoading(false)
          });
        })
  });
}
function Trainings () {
  const [isLoading, setIsLoading] = useState(true);
  const [trainings, setTrainings] = useState([]);
  const [exercises, setExercises] = useState([]);

  useEffect(() => loadTrainings(setTrainings, setExercises, setIsLoading), [])
  return (
      <>
      { !isLoading &&
        <>
          <h2>Trainings:</h2>
          <TreeView
            // className={this.classes.root}
          //   defaultCollapseIcon={<ExpandMoreIcon />}
          //   defaultExpandIcon={<ChevronRightIcon />}
          >
            {trainings.map(training => (
                <Training key={training.id} training={training} />
            ))}
          </TreeView>
        </>
      }
      </>
  );
}

export default Trainings;
