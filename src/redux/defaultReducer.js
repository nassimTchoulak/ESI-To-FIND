
import {} from './actions'
import {SET_TYPE , GET_TYPE} from "./actions";
import {DELAY_GET} from "./actions";
import {GET_PLACE} from "./actions";
import {SET_PLACE} from "./actions";


const init_state = {
    type:{
        loaded:false ,
        types:[]
    },
    place:{
        loaded:false,
        places:[]
    }
}

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
            }

            break ;
        case GET_TYPE:

            state = {
                ...state
            }

            break;
        case DELAY_GET:

            state = {
                ...state
            }
            break;

        case GET_PLACE:
            state = {
                ...state
            }
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

        default:

            break;
    }

    return state ;
}