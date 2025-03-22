import React from 'react'
import { Link } from 'react-router-dom'

const Signin = () => {
  const [signinData, setSigninData] = React.useState({
    email: '',
    password: ''
  })
  const handlesignin = async(e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:8000/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signinData)
      })

      const data = await response.json()

      if (response.ok) {
        console.log('Signin successful:', data)
      } else {
        console.error('Signin failed:', data.message)
        alert(data.message || 'Signin failed')
      }
    } catch (error) {
      console.error('Error during signin:', error)
      alert('Something went wrong. Please try again.')
    }
  }

  return (
    <div>
      <div>
        signin
      </div>
      <div>
        <form>
          <div>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' placeholder='email' value={signinData.email} onChange={(e)=>setSigninData({...signinData,email:e.target.value})}/>
            
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' placeholder='password' value={signinData.password} onChange={(e)=>setSigninData({...signinData,password:e.target.value})} />
          </div>
          <div>
            <button onClick={handlesignin}>Signin</button>
          </div>
          <div>
            <Link to={'/signup'}>Create new account</Link>
          </div>
        </form>
      </div>
    </div>
    
  )
}

export default Signin
