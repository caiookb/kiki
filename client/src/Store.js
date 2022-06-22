import { createStore, applyMiddleware, compose } from "redux";
import ReduxThunk from "redux-thunk";
import Reducers from "./redux/reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  Reducers,
  composeEnhancers(applyMiddleware(ReduxThunk))
);
