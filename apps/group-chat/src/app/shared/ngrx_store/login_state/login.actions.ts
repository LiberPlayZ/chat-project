import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.interface';
import { LoginUser } from '../../models/login_user.interface';
import { UserDTO } from '@group-chat/shared-data';

export const register = createAction('register'); // action for register .

export const registering = createAction('registering', props<{ user: UserDTO }>()); // action for register process .

export const loggingIn = createAction(
  'loggingIn',
  props<{ LoginUser: LoginUser }>()
); // action for login process .

export const loggedIn = createAction('loggedIn', props<{ LoginUser: User }>()); // action for successful  login .


export const loggingOut = createAction('loggingOut'); // action for performing  logging out .


export const logOut = createAction('logOut'); // action for log out .

export const notRegister = createAction('notRegister'); // action for login .

export const authenticating = createAction('authenticating'); // action for login .
