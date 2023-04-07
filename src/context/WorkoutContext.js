import { createContext, useReducer } from 'react'

export const WorkoutsContext = createContext()

// Reducer function: Keep local state in sync with the database updates
// Parameters: 
// -state: Previous state value
// -action: object passed into the dispatch function (one that has the type and payload properties)
export const workoutsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload
            }

        case 'CREATE_WORKOUT':
            return {
                // Add the new workout (action.payload) to the existing workouts list (state.workouts)
                // Use '...' to spread the existing workouts into the list 
                workouts: [action.payload, ...state.workouts]
            }
        
        case 'DELETE_WORKOUT':
            return {
                // Filter the workouts such that where we cycle through the current workouts,
                // and then check whether the current workout object's id equals to the passed in id that we want to delete
                // - It checks for NOT EQUAL as the filter keeps the workout objects that are NOT the one that we want to delete
                workouts: state.workouts.filter((w) => w._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const WorkoutsContextProvider = ({ children }) => {
    // UseReducer is similar to useState function in that we get back a state and a function (dispatch) to update that state value
    // The second argument for useReducer is the initial value that is specified, just like the useState
    // What's diff: The reducer function (first argument of useReducer)
    //  - How we update the state using the reducer and dispatch functions as well
    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: null
    })

    // Dispatch:
    // - Type Property: Describes the state change
    // - Payload Property: Any data that is needed to make this change
    // When the dispatch function is called, it in turn calls the reducer function
    // - It passes the action into the reducer function so that it can do its thing and update the state using that information and data
    // Example:
    // dispatch({type: 'SET_WORKOUTS', payload: [{}, {}]})
    
    return (
        // '...' in this case spreads out the different properties within the state object
        <WorkoutsContext.Provider value={{...state, dispatch}}>
            { children }
        </WorkoutsContext.Provider>
    )
}