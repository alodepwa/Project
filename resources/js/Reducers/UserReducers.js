import * as type from './../Types';
const initial = { info_location : [] }
export default function UserReducers (state = initial,  action){
	switch(action.type){
		case type.INFO_LOCATION :
			let { value } = action;
			state.info_location = value;
			return state;
		default : return state;
	}
} 