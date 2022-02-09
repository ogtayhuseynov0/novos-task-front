import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { SessionStateInterface } from './state';
import {api} from 'boot/axios';
import {TrainingSession} from 'components/models';

const actions: ActionTree<SessionStateInterface, StateInterface> = {
  getSessions({commit}) {
    commit('setSessionsLoading', true)
    return api.get('/training').then(res => {
      commit('setSessionsLoading', false)
      commit('setSessions', res.data.data)
    }).catch(err => {
      commit('setSessionsLoading', false)
      console.log(err);
    })
  },
  deleteSession({commit,dispatch},sessionID) {
    commit('setSessionsLoading', true)
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return api.delete('/training/'+sessionID).then(res => {
      void dispatch('getSessions', res)
      return res
    }).catch(err => {
      commit('setSessionsLoading', false)
      console.log(err);
    })
  },
  saveSession({commit, dispatch}, session) {
    commit('setSessionsLoading', true)
    return api.post('/training', {...session}).then(res => {
      commit('setSessionsLoading', false)
      void dispatch('getSessions', res)
      return res
    }).catch(err => {
      commit('setSessionsLoading', false)
      console.log(err);
    })
  },
  update({}, session) {
    // commit('setSessionsLoading', true)
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return api.patch('/training/'+session.id, {...session}).then(res => {
      // commit('setSessionsLoading', false)
      return res
    }).catch(err => {
      // commit('setSessionsLoading', false)
      console.log(err);
    })
  },
  addToPlan({commit, dispatch}, session) {
    commit('addOneToBank', session.id)
    void dispatch('update', session)
  },
  removeFromPlan({commit,dispatch}, session) {
    commit('removeFromPlan', session.id)
    void dispatch('update', session)
  },
  doneTask({commit,dispatch}, session) {
    commit('doneTask', session.id)
    void dispatch('update', session)
  },
  undoneTask({commit,dispatch}, session) {
    commit('undoneTask', session.id)
    void dispatch('update', session)
  },
  movePlanTask({commit,dispatch}, sessions) {
   sessions.map((a:TrainingSession, i:number) => {
     const or = {...a, order: i+1}
     commit('setOneSession', or)
     void dispatch('update', or)
      return a
    })

  },
  clearPlan({commit, state,dispatch}) {
    state.sessions.filter(a => !a.bank).map(z => {
      commit('removeFromPlan', z.id)
      void dispatch('update', z)
    })
  },
};


export default actions;
