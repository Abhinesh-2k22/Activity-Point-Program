import React from 'react'

const Signup = () => {
  const [signupData, setSignupData] = React.useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'customer',
    address: '',
    pincode: ''
  })
  const handlesignup = async(e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:8000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupData)
      })

      const data = await response.json()

      if (response.ok) {
        console.log('Signup successful:', data)
      } else {
        console.error('Signup failed:', data.message)
        alert(data.message || 'Signup failed')
      }
    } catch (error) {
      console.error('Error during signup:', error)
      alert('Something went wrong. Please try again.')
    }
  }

  return (
    <div>
      <div>signup</div>
      <form>
        <div>
          <label htmlFor='name'>Name</label>
          <input type='text' id='name' placeholder='name' value={signupData.name} onChange={(e)=>setSignupData({...signupData,name:e.target.value})}/>
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' placeholder='email' value={signupData.email} onChange={(e)=>setSignupData({...signupData,email:e.target.value})}/>
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' placeholder='password' value={signupData.password} onChange={(e)=>setSignupData({...signupData,password:e.target.value})}/>
        </div>
        <div>
          <label htmlFor='phone'>Phone</label>
          <input type='text' id='phone' placeholder='phone' value={signupData.phone} onChange={(e)=>setSignupData({...signupData,phone:e.target.value})}/>
        </div>
        <div>
          <label htmlFor='role'>Role</label>
          <select id='role' value={signupData.role} onChange={(e)=>setSignupData({...signupData,role:e.target.value})}>
            <option value='customer'>Customer</option>
            <option value='grocery_owner'>Grocery Owner</option>
            <option value='saloon_owner'>Saloon Owner</option>
            <option value='renting_broker'>Renting Broker</option>
            <option value='service_provider'>Service Provider</option>
          </select>
        </div>
        <div>
          <label htmlFor='address'>Address</label>
          <input type='text' id='address' placeholder='address' value={signupData.address} onChange={(e)=>setSignupData({...signupData,address:e.target.value})}/>
        </div>
        <div>
          <label htmlFor='pincode'>Pincode</label>
          <input type='text' id='pincode' placeholder='pincode' value={signupData.pincode} onChange={(e)=>setSignupData({...signupData,pincode:e.target.value})}/>
        </div>
          <button onClick={handlesignup}>Signup</button>
      </form>
      
    </div>
  )
}

export default Signup
