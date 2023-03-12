import { useState } from "react"

function RegisterPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function register(event) {
    event.preventDefault()
    const response = await fetch(`${process.env.API_HOST}/register`, {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {'Content-type': 'application/json'}
    })
    if (response.status === 200) {
      alert('Registration successful')
    } else {
      alert('Registration failed')
    }
  }

  return (
    <form className='register' action='' method='post' onSubmit={register}>
      <h1>Register</h1>
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
      <button type="submit">Register</button>
    </form>
  )
}

export default RegisterPage
