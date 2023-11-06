import { combineReducers } from "redux";
import userReducer from './userSlice';
import  adminReducer from './adminSlice';

const combinedSlices = combineReducers({
    user: userReducer,
    admin: adminReducer,
}); 

export default combinedSlices;