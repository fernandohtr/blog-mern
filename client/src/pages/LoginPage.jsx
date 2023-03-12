import { useState } from 'react'
import { Navigate } from 'react-router-dom'

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  async function login(event) {
    event.preventDefault();
    const response = await fetch(`${process.env.API_HOST}/login`, {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {'Content-type': 'application/json'},
      credentials: 'include',
    })
    if (response.ok) {
      setRedirect(true);
    } else {
      alert('Login failed');
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }
  
  return (
    <form className='login' action='' method='post' onSubmit={login}>
      <h1>Login</h1>
      <input type='text'
             name=''
             id=''
             placeholder='username'
             value={username}
             onChange={event => setUsername(event.target.value)}
      />
      <input type='password'
             name=''
             id=''
             placeholder='password'
             value={password}
             onChange={event => setPassword(event.target.value)}
      />
      <button type='submit'>Login</button>
    </form>
  )
}

export default LoginPage
