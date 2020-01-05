import {SET_TYPE , setType } from  "./actions"
import { defaultReducer } from "./defaultReducer";
import {createStore, applyMiddleware } from 'redux'
import  thunk  from 'redux-thunk'



export default createStore(defaultReducer,undefined,applyMiddleware(thunk) ) ;