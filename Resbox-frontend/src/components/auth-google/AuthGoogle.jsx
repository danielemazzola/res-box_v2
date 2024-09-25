/* import React from 'react'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'

const AuthGoogle = () => {
  const handleLoginSuccess = (credentialResponse) => {
    console.log(credentialResponse)
    console.log(credentialResponse.credential)
  }

  const handleLoginError = () => {
    console.log('Login Failed')
  }

  return (
    <GoogleOAuthProvider clientId='815895891319-0jor9f3cqev36ms0jf6jbaek15hmpgmg.apps.googleusercontent.com'>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginError}
        text='Google'
        theme='outline'
        size='large'
        shape='rectangular'
      />
    </GoogleOAuthProvider>
  )
}

export default AuthGoogle
 */