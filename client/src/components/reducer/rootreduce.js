import {userReducer} from './userReducer';
import { chartReducer } from './chartreducer';
import {combineReducers} from 'redux';
import { bookingReducer } from './bookingreducer';

const rootReducer = combineReducers({
    user: userReducer,
    chart: chartReducer,
    booking: bookingReducer
})

export default rootReducer