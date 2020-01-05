import Axios from "axios";
import ip from "../store/ip_provider";


export const SET_TYPE = 'SET-TYPE' ;

export const GET_TYPE = 'GET-TYPE';

export const DELAY_GET = 'DELAY-GET';

export function delayGet() {
     return (dispatch)=> {
         setTimeout(() => {

             dispatch(getType())

         }, 2000)

     }
}

export function getType() {
    return (dispatch)=>{
        Axios.get(ip()+'/api/types', {params: {str:""}}).then((res) => {

            dispatch(setType(res.data)) }

        ).catch((err) => {
            console.log(err)

            dispatch(delayGet()) // = dispatch(setType([]) ) case not loaded try again in 2s
        });
    }
}

export function setType(array_types) {
    return {
        type: SET_TYPE ,
        payload:{
            types:array_types
        }
    }
}