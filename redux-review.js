//say hi
console.log("from redux js");

//get your resources
const redux = require("redux");
const createStore = redux.createStore;

//define action types (this is so actions, when used, are variables, not strings)
const BUY_DONUTS = "BUY_DONUTS";

//define your action creator
const buyDonuts = () => {
  return {
    type: BUY_DONUTS,
    info: "I bought a donut"
  };
};

//define initial state
const initialState = {
  numberOfDonuts: 12
};

//basic reducer - just a function that accepts and returns your state
const reducer = (state = initialState, action) => {
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

//make your store, providing a reducer
const store = createStore(reducer);

//subscribe to the store, get the state
store.subscribe(() => {
  console.log("CURRENT STATE", store.getState());
});

//finally, dispatch an action!
store.dispatch(buyDonuts());
store.dispatch(buyDonuts());
store.dispatch(buyDonuts());

