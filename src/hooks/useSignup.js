import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = async (email, password) => {
    setIsLoading(true)
    setError(null)

    // POST request for signing up
    // Getting the response in JSON format
    // - Error object if invalid
    // - User object if valid
    const response = await fetch('/api/user/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      // Save the user to local storage via the user object 
      // - User object contains the JSON web token and the email property
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setIsLoading(false)
    }
  }

  return { signup, isLoading, error }
}




// import { useState } from "react";
// import { useAuthContext } from './useAuthContext'

// export const useSignup = () => {
//     const [error, setError] = useState(null)
//     const [isLoading, setIsLoading] = useState(null)
//     const { dispatch } = useAuthContext()
    
//     const signup = async (email, password) => {
//         setIsLoading(true)
//         setError(null)

//         
//         const response = await fetch('/api/user/signup', {
//             method: 'POST', 
//             headers: { 'Context-Type': 'application/json'},
//             body: JSON.stringify({ email, password })
//         })

//         // Getting the response in JSON format
//         // - Error object if invalid
//         // - User object if valid
//         const json = await response.json()

//         if (!response.ok) {
//             setIsLoading(false)
//             setError(json.error)
//         }

//         if (response.ok) {
//             // Save the user to local storage via the user object 
//             // - User object contains the JSON web token and the email property 
//             localStorage.setItem('user', JSON.stringify(json))

//             // Update auth context
//             dispatch({type: 'LOGIN', payload: json})

//             setIsLoading(false)
//         }
//     }

//     return { signup, isLoading, error }
// }