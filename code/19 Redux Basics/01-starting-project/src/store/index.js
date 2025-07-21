import { createStore } from "redux"

const initialState = {counter: 0, showCounter: true}

const counterReducer = (state = {counter: 0, showCounter: true}, action) => {
    // Must remember to set the rest of the properties of the old state to the new state
    if (action.type === "increment"){
        // must always remember to return a new object when changing the state
        return {
            counter: state.counter + 1,
            showCounter: state.showCounter
        }
    }

    if (action.type === "decrement"){
        return {
            counter: state.counter - 1,
            showCounter: state.showCounter
        }
    }

    if (action.type === "increase"){
        return {
            counter: state.counter + action.amount,
            showCounter: state.showCounter
        }
    }

    if (action.type === "toggle"){
        return {
            showCounter: !state.showCounter,
            counter: state.counter
        }
    }

    return state
}

const store = createStore(counterReducer)

export default store