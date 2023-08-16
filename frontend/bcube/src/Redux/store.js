
import {applyMiddleware, combineReducers, legacy_createStore} from 'redux'
import thunk from 'redux-thunk'
import {reducer1 as videoReducer} from './Redux'
import {reducerSearch as searchReducer} from "./Redux"
import {reducerUpload as uploadReducer} from './Redux'
import {reducerDelete as deleteReducer} from './Redux'
import {reducerEdit as updateReducer} from './Redux'
import {reducerOverview as overviewReducer} from './Redux'
import {reducerLogin as loginReducer} from './Redux'
const rootReducer=combineReducers({videoReducer,searchReducer,uploadReducer,deleteReducer,updateReducer,overviewReducer,loginReducer})

export const store=legacy_createStore(rootReducer,applyMiddleware(thunk))