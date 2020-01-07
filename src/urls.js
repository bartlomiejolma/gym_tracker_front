
import { ENVIRONMENT, ENVIRONMENTS } from './env';

const BACKEND_URL = process.env.REACT_APP_USE_LOCAL_API === 'true'
  ? `http://localhost:${process.env.REACT_APP_LOCAL_API_PORT}`
  : ({
    [ENVIRONMENTS.DEV]: 'http://localhost:3004',
  })[ENVIRONMENT];

const API_URL = `${BACKEND_URL}`;

export const EXERCISES = `${API_URL}/exercises`;
export const TRAININGS = `${API_URL}/trainings`;
export const TRAINING_EXERCISES = `${API_URL}/training_exercises`;