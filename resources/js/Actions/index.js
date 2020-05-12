import * as types from "./../Types";
/**
 * get info trips 
 */
export function info_location (value){
    return {
        type : types.INFO_LOCATION,
        value
    }
} 
/**
 * login
 */
export function login(value){
    return {
        type : types.LOGIN,
        value
    }
}