console.log("from  index.js");
//in react we'd us es6 import
//import redux from 'redux';
// non-es6 for node
const redux = require("redux");

//here we map the redux store creation method to a simple method
const createStore = redux.createStore;

//get the combine reducer from redux
const combineReducers = redux.combineReducers

// convention to avoid typos, due to reuse of action types
const BUY_DONUTS = "BUY_DONUTS";
const BUY_COFFEE = "BUY_COFFEE";

// all actions have types and other needed info
// 'action' is an object with a type property
// {
//     type: BUY_DONUTS,
//     info: 'first redux action'
// }

// action creator is a function that returns the action
function buyDonuts() {
  return {
    type: BUY_DONUTS,
    info: "first redux action"
  };
}
function buyCoffee() {
  return {
    type: BUY_COFFEE,
    info: "bought a coffee"
  };
}

//reducer accepts previous state, and an action, and returns the new state
// it requires an initialState of some kind

const initialDonutState = {
  numberOfDonuts: 12
};
const initialCoffeeState = {
  amountOfCoffee: 48
};

const donutReducer = (state = initialDonutState, action) => {
  switch (action.type) {
    case BUY_DONUTS:
      return {
        ...state,
        numberOfDonuts: state.numberOfDonuts - 1
      };
    default:
      return state;
  }
};
const coffeeReducer = (state = initialCoffeeState, action) => {
  switch (action.type) {
    case BUY_COFFEE:
      return {
        ...state,
        amountOfCoffee: state.amountOfCoffee - 1
      };
    default:
      return state;
  }
};

//IMPORTANT!! createStore accepts a reducer as a parameter
//here we create the store
//if we combine reducers, this is a good place to do that too.
//Note that combined reducers will nest state one layer deeper in the resulting state
//ALSO NOTE that both reducers are fired, but only one is triggered - don't use the same action string for more than 1
const rootReducer = combineReducers({
    donut: donutReducer,
    coffee: coffeeReducer
})

//don't forget to add the rootReducer to the store if created
const store = createStore(rootReducer);
console.log("initial state", store.getState());

//subscribe allows the app to respond to changes in the store
//this is achieved with the .subscribe() method, which accepts a callback
//like an interval, we can cancel a subscription by attaching a subscription to a variable, and then calling it
const unsubscribe = store.subscribe(() =>
  console.log("updated state", store.getState())
);
//dispatch is the way we get actions into the store's reducer
//it is best to use the action creator to get the action into the dispatch  method
store.dispatch(buyDonuts());
store.dispatch(buyDonuts());
store.dispatch(buyDonuts());
store.dispatch(buyCoffee());
store.dispatch(buyCoffee());
unsubscribe();
