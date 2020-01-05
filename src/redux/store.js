import {SET_TYPE , setType } from  "./actions"
import { typeReducer } from "./typeReducer";
import {createStore, applyMiddleware } from 'redux'
import  thunk  from 'redux-thunk'



export default createStore(typeReducer,undefined,applyMiddleware(thunk) ) ;