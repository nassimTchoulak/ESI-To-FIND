
import {} from './actions'
import {SET_TYPE , GET_TYPE} from "./actions";
import {DELAY_GET} from "./actions";
import {GET_PLACE} from "./actions";
import {SET_PLACE,NOTIFICATION_VU,NOTIFICATION_SET} from "./actions";


const init_state = {
    type:{
        loaded:false ,
        types:[]
    },
    place:{
        loaded:false,
        places:[]
    },
    notification:{
        loaded:false,
        notifications:[]
    }
} ;

export function defaultReducer(state=init_state , action){

    switch(action.type){
        case SET_TYPE:

            if(action.payload.types.length>0){
                state = {
                    ...state,
                    type: {
                        loaded: true,
                        types: action.payload.types
                    }
                }
            }
            state = {
                ...state
            };

            break ;
        case GET_TYPE:

            state = {
                ...state
            };

            break;
        case DELAY_GET:

            state = {
                ...state
            };
            break;

        case GET_PLACE:
            state = {
                ...state
            };
            break;

        case SET_PLACE:

            if(action.payload.places.length>0) {
                state = {
                    ...state,
                    place: {
                        loaded: true,
                        places:action.payload.places
                    }
                }
            }
            break;

        case NOTIFICATION_VU:

            if(action.payload.not_id!==undefined) {
                let j = action.payload.not_id ;
                let modif = [] ;
                state.notification.notifications.forEach((i)=>{
                    if(i.not_id!==j){
                        modif.push(i)
                    }
                    else{
                        modif.push({
                            ...i,
                            not_done:1
                        })
                    }
                }) ;

                state = {
                    ...state,
                    notification: {
                        loaded: true,
                        notifications:modif
                    }
                }
            }
            break;
        case NOTIFICATION_SET:

            if(action.payload.notifications.length>0) {
                state = {
                    ...state,
                    notification: {
                        loaded: true,
                        notifications:action.payload.notifications
                    }
                }
            }
            break;

        default:

            break;
    }

    return state ;
}