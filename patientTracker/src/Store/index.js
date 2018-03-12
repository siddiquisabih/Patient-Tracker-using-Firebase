import Reducer from "./Reducer/patientReducer"

import {createStore , applyMiddleware , combineReducers} from "redux"
import thunk from "redux-thunk"

let combine = combineReducers({Reducer})
let middleware = applyMiddleware(thunk)

let Store = createStore(combine , middleware)


Store.subscribe(()=>{
    console.log("store State",Store.getState())
})

export default Store