import React, { useCallback } from 'react'
import { Redirect } from 'react-router-dom'

export default Component => props => {
  const checkAuth = useCallback(() => {
    const auth = window.localStorage.getItem('auth')
    if (auth) {
      return true
    } else {
      return false
    }
  }, [])

  const loggedIn = checkAuth()
  // console.log('auth status', loggedIn)
  if (loggedIn) {
    return <Component {...props} />
  } else if (!loggedIn) {
    return <Redirect to="/login" />
  }
}
