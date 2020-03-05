const redux = require("redux");
const applyMiddleware = redux.applyMiddleware;
const createStore = redux.createStore;
const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();

const thunkMiddleware = require("redux-thunk").default;
const axios = require("axios");

const initialState = {
  loading: false,
  donuts: {},
  error: ""
};

const FETCH_DONUTS_REQUEST = "FETCH_DONUTS_REQUEST";
const FETCH_DONUTS_SUCCESS = "FETCH_DONUTS_SUCCESS";
const FETCH_DONUTS_FAILURE = "FETCH_DONUTS_FAILURE";

const fetchDonutsRequest = () => {
  return {
    type: FETCH_DONUTS_REQUEST
  };
};

const fetchDonutsSuccess = donuts => {
  return {
    type: FETCH_DONUTS_SUCCESS,
    payload: donuts
  };
};

const fetchDonutsError = error => {
  return {
    type: FETCH_DONUTS_FAILURE,
    error: error
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DONUTS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_DONUTS_SUCCESS:
      return {
        loading: false,
        donuts: action.payload,
        error: ""
      };
    case FETCH_DONUTS_FAILURE:
      return {
        loading: false,
        donuts: {},
        error: action.error
      };
  }
};

const fetchDonuts = () => {
  return dispatch => {
    dispatch(fetchDonutsRequest());
    //axios is needed when not in browser
    axios
      .get("http://localhost:3000/donuts")
      .then(response => dispatch(fetchDonutsSuccess(response.data)))
      .catch(error => {
        dispatch(fetchDonutsError(error.message));
      });
  };
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware, logger));
console.log(store.getState());

store.subscribe(() => {});
store.dispatch(fetchDonuts());

//redux-thunk is needed for action creators in react
