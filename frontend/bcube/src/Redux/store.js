
import {applyMiddleware, combineReducers, legacy_createStore} from 'redux'
import thunk from 'redux-thunk'
import {reducer as videoReducer} from './videoReducer/reducer'
import {reducer as searchReducer} from "./searchReducer/reducer"
import {reducer as uploadReducer} from './uploadReducer/reducer'
import {reducer as deleteReducer} from './DeleteReducer/reducer'
import {reducer as updateReducer} from './updateReducer/reducer'
import {reducer as overviewReducer} from './overviewReducer/Reducer'
import {reducer as loginReducer} from './loginReducer/reducer'
const rootReducer=combineReducers({videoReducer,searchReducer,uploadReducer,deleteReducer,updateReducer,overviewReducer,loginReducer})

export const store=legacy_createStore(rootReducer,applyMiddleware(thunk))