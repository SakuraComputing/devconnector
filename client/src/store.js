import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

let setUp;

const middleware = [thunk];

if(process.env.NODE_ENV === 'production') {
    setUp = compose(applyMiddleware(...middleware)) 
} else {
    setUp = compose(applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
}

console.log(process.env.NODE_ENV);


const store = createStore(
    rootReducer,
    initialState,
    setUp
);

export default store;
