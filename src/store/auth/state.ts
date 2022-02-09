import {User} from 'components/models';

export interface AuthStateInterface {
  user: User | undefined;
  token: string | undefined,
  formLoading: boolean
}

function state(): AuthStateInterface {
  return {token: undefined, user: undefined, formLoading: false};
}

export default state;
