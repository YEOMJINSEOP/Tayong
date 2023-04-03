import {atom, selector} from 'recoil';
import { onUserStateChange } from '../apis/firebase';

// interface User {
//   id: string;
//   name: string;
//   email: string;
// }

export const userState = atom({
  key: 'userState',
  default: {
    id: 'default',
    name: 'default',
    email: 'default',
  }
})

export const currentUserState = selector({
  key: 'currentUserState',
  get: () => {
    const currentUser = onUserStateChange((user) => {return user} );
  }
})