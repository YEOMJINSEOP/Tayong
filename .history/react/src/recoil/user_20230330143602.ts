import {atom} from 'recoil';

interface User {
  id: string;
  name: string;
  email: string;
}

export const userState = atom<User>({
  key: 'userState',
  default: {
    id: 'default',
    name: 'default',
    email: 'default',
  }
})