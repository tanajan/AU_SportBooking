import {userReducer} from './userReducer';
import { chartReducer } from './chartreducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    user: userReducer,
    chart: chartReducer
})

export default rootReducer