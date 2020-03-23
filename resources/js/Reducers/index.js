import { combineReducers} from 'redux';
import  UserReducers  from './UserReducers';
import  AdminRedurces  from './AdminRedurces';
export const myReducer = combineReducers({ User : UserReducers, Admin : AdminRedurces});

