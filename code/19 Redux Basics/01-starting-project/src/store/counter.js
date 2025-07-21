import { createSlice } from "@reduxjs/toolkit"

const initialCounterState = {counter: 0, showCounter: true}

const counterSlice = createSlice({
    name: "counter",
    initialState: initialCounterState,
    // Map of all reducers this slice needs
    reducers: {
        // allowed to mutate the state directly, redux toolkit internally helps us clone a new state
        increment(state) {
            state.counter++
        },
        decrement(state) {
            state.counter--
        },
        increase(state, action) {
            state.counter += action.payload
        },
        toggleCounter(state) {
            state.showCounter = !state.showCounter
        }
    }
})

export const counterActions = counterSlice.actions

export default counterSlice.reducer