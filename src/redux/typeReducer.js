
import {} from './actions'
import {SET_TYPE , GET_TYPE} from "./actions";
import {DELAY_GET} from "./actions";


const init_state = {
    type:{
        loaded:false ,
        types:[]
    }
}

export function typeReducer(state=init_state , action){

    switch(action.type){
        case SET_TYPE:

            if(action.payload.types.length>0){
                state = {
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

        default:

            break;
    }

    return state ;
}