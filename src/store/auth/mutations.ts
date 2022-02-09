import { MutationTree } from 'vuex';
import {AuthStateInterface} from './state';
import {User} from 'components/models';

const mutation: MutationTree<AuthStateInterface> = {
  setUser(state, user: User) {
    state.user = user
  },
  setLoading(state, loading: boolean) {
    state.formLoading = loading
  },
  setToken(state, token: string|undefined) {
    state.token = token
    if (!token){
      localStorage.removeItem('token')
    }else{
      localStorage.setItem('token', token)
    }
  },
};

export default mutation;
