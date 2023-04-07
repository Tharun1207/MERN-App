import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
    // useContext takes the values passed into the context component
    // - In this case its the state and dispatch function passed into WorkoutsContextProvider in WorkoutContext.js
    const context = useContext(AuthContext)

    if (!context) {
        throw Error('useAuthContext must be used inside an AuthContextProvider!')
    }
    
    return context
}