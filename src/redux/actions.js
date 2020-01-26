import Axios from "axios";
import ip from "../store/ip_provider";
import querystr from "querystring";


export const SET_TYPE = 'SET-TYPE' ;

export const GET_TYPE = 'GET-TYPE';

export const DELAY_GET = 'DELAY-GET';


export const NOTIFICATION_VU = 'VU-NOTIF';
export const NOTIFICATION_SET = 'SET-NOTIF';

//places consts
export const SET_PLACE = 'SET-PLACE';
export const GET_PLACE = "GET-PLACE";


export function delayGet(next,params_extra) {
     return (dispatch)=> {
         setTimeout(() => {

            if(params_extra!==undefined){
                dispatch(next(params_extra))
            }
            else {
                dispatch(next())
            }

         }, 2000)

     }
}

// async functions

export function getNotifications(_id){
    return (dispatch)=>{
        Axios.get(ip()+'/api/notification',{params:{_id:_id}}).then((res)=>{
            console.log(res.data);
            dispatch(setNotifications(res.data));


        }).catch((err)=>{
            console.log(err);
            dispatch(delayGet(getNotifications,_id));
        })
    }
}

export function notificationSeen(_id,not_id){
    return (dispatch)=>{

        Axios.post(ip()+'/api/notification_done', querystr.stringify({
            _id:_id,
            not_ids:"["+not_id+"]"

        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((res)=>{
            if(res.data.status){
                dispatch(notificationVU(not_id))
            }

        }).catch((err)=>{
            console.log(err);
        })
    }
}


export function getType() {
    return (dispatch)=>{
        console.log("http types");

        Axios.get(ip()+'/api/types', {params: {str:""}}).then((res) => {

            dispatch(setType(res.data)) }

        ).catch((err) => {
            console.log(err)

            dispatch(delayGet(getType)) // = dispatch(setType([]) ) case not loaded try again in 2s
        });
    }
}

// sync functions

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
            console.log(err);
            dispatch(delayGet(getPlace))
        });
    }
}

export  function setNotifications(notifications){
    return {
        type:NOTIFICATION_SET ,
        payload:{
            notifications:notifications
        }
    }
}

export function notificationVU(not_id){
    return {
        type:NOTIFICATION_VU ,
        payload : {
            not_id : not_id
        }
    }
}