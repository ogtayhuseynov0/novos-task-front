import { MutationTree } from 'vuex';
import {SessionStateInterface} from './state';
import {TrainingSession} from 'components/models';

const mutation: MutationTree<SessionStateInterface> = {
  setSessions (state: SessionStateInterface, sessions: TrainingSession[]) {
    state.sessions = sessions
  },
  setOneSession (state: SessionStateInterface, session: TrainingSession) {
    state.sessions.map(a => {
      if (a.id === session.id){
        return session
      }
      return a
    })
    console.log('session', state.sessions);

  },
  addOneToBank(state: SessionStateInterface, id: string){
     state.sessions.map(a => {
       if (a.id === id) {
         a.bank = false
         return a
       }
       return a
     })
  },
  removeFromPlan(state: SessionStateInterface, id: string){
     state.sessions.map(a => {
       if (a.id === id) {
         a.bank = true
         a.isDone = false
         return a
       }
       return a
     })
  },
  doneTask(state: SessionStateInterface, id: string){
     state.sessions.map(a => {
       if (a.id === id) {
         a.isDone = true
         return a
       }
       return a
     })
  },
  undoneTask(state: SessionStateInterface, id: string){
     state.sessions.map(a => {
       if (a.id === id) {
         a.isDone = false
         return a
       }
       return a
     })
  },
  setSessionsLoading(state, load: boolean){
    state.sessionsLoading = load
  }
};

export default mutation;
