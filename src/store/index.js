import {createStore, applyMiddleware} from 'redux';
import rootReducer from  "../reducers";
import thunkMiddleware from "redux-thunk";


const store =createStore(rootReducer,applyMiddleware(thunkMiddleware));


export default store;