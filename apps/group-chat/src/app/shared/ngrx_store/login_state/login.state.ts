import { createFeature, createReducer, on } from '@ngrx/store';
import {
  register,
  loggingIn,
  logOut,
  loggedIn,
  registering,
  notRegister,
  loggingOut,
  authenticating,
} from './login.actions';
import { User } from '../../models/user.interface';

import { IsLoggingIn } from '../../enums/isLogging.enum';

export interface LoggingState {
  isLoggingIn: IsLoggingIn;
  user: User | null;
}

const initialState: LoggingState = {
  isLoggingIn: IsLoggingIn.NOT_LOGGING,
  user: null,
};

const isLoggingInReducer$ = createReducer(
  initialState,
  on(register, (state) => {
    return {
      ...state,
      isLoggingIn: IsLoggingIn.NOT_LOGGING,
  
    };
  }),
  on(registering, (state) => {
    return {
      ...state,
      isLoggingIn: IsLoggingIn.REGISTERING,
    };
  }),
  on(loggingIn, (state) => {
    return {
      ...state,
      isLoggingIn: IsLoggingIn.LOGGING,
    };
  }),
  on(loggedIn, (state, action) => {
    return {
      ...state,
      isLoggingIn: IsLoggingIn.LOGGED_IN,
      user: action.LoginUser,
    };
  }),
  on(logOut, (state) => {
    return {
      ...state,
      isLoggingIn: IsLoggingIn.NOT_LOGGING,
      user: null,
    };
  }),
  on(loggingOut, (state) => {
    return {
      ...state,
      isLoggingIn: IsLoggingIn.LOGGING_OUT,
    };
  }),
  on(notRegister, (state) => {
    return {
      isLoggingIn: IsLoggingIn.NOT_REGISTER,
      user: null,
    };
  }),
  on(authenticating, (state) => {
    return {
      isLoggingIn: IsLoggingIn.AUTHENTICATING,
      user: null,
    };
  })
);

export function isLoggingInReducer(state: any, action: any) {
  return isLoggingInReducer$(state, action);
}

export const isLoggingInFeature = createFeature({
  name: 'isLoggingInFeature',
  reducer: isLoggingInReducer$,
});
