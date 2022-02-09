import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { AuthStateInterface } from './state';
import {api} from 'boot/axios';
import {Notify} from 'quasar';

const actions: ActionTree<AuthStateInterface, StateInterface> = {
  login({commit}, payload) {
    commit('setLoading',true)
    return api.post('/login', {...payload}).then( res => {
      commit('setLoading', false)
      commit('setUser', res.data.user)
      commit('setToken', res.data.token)
      Notify.create({
        message: res.data.message,
        color: 'green'
      })
      // @ts-ignore
      this.$router.push('/')
    }).catch(err => {
      commit('setLoading',false)
      throw err
    })

  },

  register({commit}, payload) {
    commit('setLoading',true)
    return api.post('/register', {...payload}).then( res => {
      commit('setLoading', false)
        Notify.create({
          message: res.data.message,
          color: 'green'
        })
        // @ts-ignore
        this.$router.push('/login')
      }).catch(err => {
        commit('setLoading',false)
        throw err
    })

  },

  logout({commit, state}) {
    api.post('/logout', {}, {
      headers: {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        'Authorization': `Bearer ${state.token}`
      }
    }).then( res => {
      commit('setUser', undefined)
      commit('setToken', undefined)
      Notify.create({
        message: res.data.message,
        color: 'green'
      })
      // @ts-ignore
      this.$router.push('/login')
    }).catch(err => {
      console.log(err);
    })

  },

};

export default actions;
