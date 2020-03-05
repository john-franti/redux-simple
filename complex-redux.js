console.log("from complex redux js");

const redux = require("redux");
const createStore = redux.createStore;

//we might need multiple reducers if we have diverse types of data in state
//a reducer for donuts should handle coffee
const combineReducers = redux.combineReducers;

//middleware helps expand functionality
//to add middleware, we use the redux middleware tool
const applyMiddleware = redux.applyMiddleware;

//let's add logger as middleware, we'll add this  middleware when  we create the store
const reduxLogger = require("redux-logger");
//create logger is needed to create an instance of the logger
const logger = reduxLogger.createLogger();

const BUY_DONUTS = "BUY_DONUTS";
const buyDonuts = () => {
  return {
    type: BUY_DONUTS,
    info: "I bought a donut"
  };
};

//new type and action creator
const BUY_COFFEE = "BUY_COFFEE";
const buyCoffee = () => {
  return {
    type: BUY_COFFEE,
    info: "I bought a coffee"
  };
};

//define initial state, note that it is now nested deeper
const initialDonutState = {
  numberOfDonuts: 12
};

const initialCoffeeState = {
  amountOfCoffee: 144
};

//same reducer as before, but renamed
const donutReducer = (state = initialDonutState, action) => {
  switch (action.type) {
    case BUY_DONUTS:
      return {
        numberOfDonuts: state.numberOfDonuts - 1
      };
    default:
      return state;
  }
};

//new reducer, to handle new behaviors (choosing when to make a new reducer is something to learn)
const coffeeReducer = (state = initialCoffeeState, action) => {
  switch (action.type) {
    case BUY_COFFEE:
      return {
        amountOfCoffee: state.amountOfCoffee - 12
      };
    default:
      return state;
  }
};

//we now have 2 reducers, so we need to get them together in one place
//this output will nest the data one layer down in the store, so it's worth checking
const rootReducer = combineReducers({
  donuts: donutReducer,
  coffee: coffeeReducer
});

//make your store, providing a reducer
const store = createStore(rootReducer);

//subscribe to the store, get the state
store.subscribe(() => {
  console.log("CURRENT STATE", store.getState());
});

//finally, dispatch an action!
store.dispatch(buyDonuts());
store.dispatch(buyDonuts());
store.dispatch(buyDonuts());
store.dispatch(buyCoffee());
store.dispatch(buyCoffee());
