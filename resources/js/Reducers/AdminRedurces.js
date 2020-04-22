import * as types from './../Types/index';

export default function AdminReducers (state = [{ isLogin : false, login : [] }], action){
	switch(action.type){
		case types.LOGIN :
			state[0].isLogin = true;
			state[0].login = action.value[0];
			return [...state] ;
		
		default : return state;
	}
}