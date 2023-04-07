import { WorkoutsContext } from "../context/WorkoutContext";
import { useContext } from "react";

export const useWorkoutsContext = () => {
    // useContext takes the values passed into the context component
    // - In this case its the state and dispatch function passed into WorkoutsContextProvider in WorkoutContext.js
    const context = useContext(WorkoutsContext)

    if (!context) {
        throw Error('useWorkoutsContext must be used inside a WorkoutsContextProvider')
    }
    
    return context
}