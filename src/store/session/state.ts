import {TrainingSession} from 'components/models';

export interface SessionStateInterface {
  sessions: TrainingSession[],
  sessionsLoading: boolean
}

function state(): SessionStateInterface {
  return {
    sessions: [],
    sessionsLoading: false
  };
}

export default state;
