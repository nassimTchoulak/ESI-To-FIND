import Axios from "axios";
import ip from "../store/ip_provider";


export const SET_TYPE = 'SET-TYPE' ;

export const GET_TYPE = 'GET-TYPE';

export const DELAY_GET = 'DELAY-GET';


//places consts
export const SET_PLACE = 'SET-PLACE';
export const GET_PLACE = "GET-PLACE";


export function delayGet(next) {
     return (dispatch)=> {
         setTimeout(() => {

             dispatch(next())

         }, 2000)

     }
}

export function getType() {
    return (dispatch)=>{
        console.log("http types")

        Axios.get(ip()+'/api/types', {params: {str:""}}).then((res) => {

            dispatch(setType(res.data)) }

        ).catch((err) => {
            console.log(err)

            dispatch(delayGet(getType)) // = dispatch(setType([]) ) case not loaded try again in 2s
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


export function setPlace(array){
    return {
        type:SET_PLACE ,
        payload:{
            places:array
        }
    }
}

export function getPlace(){
    return (dispatch)=> {
        console.log("http places")

        Axios.get(ip()+'/api/places', {params: {str:""}}).then((res) => {
               // this.all_places=res.data;
                dispatch(setPlace(res.data))

            }
        ).catch((err) => {
            console.log(err)
            dispatch(delayGet(getPlace))
        });
    }
}