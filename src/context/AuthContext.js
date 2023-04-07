import { createContext, useReducer, useEffect } from 'react'

// Creating the context
export const AuthContext = createContext()

// Auth reducer function
export const authReducer = (state, action) => {
    switch (action.type) {
        // Login global state
        case 'LOGIN':
            return { user: action.payload }

        // Logout global state
        case 'LOGOUT':
            return { user: null }

        // Return previous state at default
        default: 
            return state
    }
}

// Create custon component to wrap the App
export const AuthContextProvider = ({ children }) =>  {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    // useEffect to check whether a JSON web token exists, and if so, show that they are logged in
    // Use empty dependency array as only need to be checked once
    useEffect(() => {
        // As the user object in localStorage is in JSOn format, need to parse it back into object format so that we can use it
        const user = JSON.parse(localStorage.getItem('user'))

        // If user object exists, update the global context accordingly
        if (user) {
            dispatch({type: 'LOGIN', payload: user})
        }
    }, [])

    // Everytime the state changes, it is logged in the console
    console.log('AuthContext state: ', state)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}