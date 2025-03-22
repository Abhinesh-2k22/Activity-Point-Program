import React from 'react'
import { Link,useNavigate } from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate();
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
        alert('Signup successful')
        navigate('/signin');
      } else {
        console.error('Signup failed:', data.message)
        alert(data.message || 'Signup failed')
      }
    } catch (error) {
      console.error('Error during signup:', error)
      alert('Something went wrong. Please try again.')
    }
  }
  const styles = {
    container: {
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      height: '100vh', backgroundColor: '#f0fff0',
    },
    formCard: {
      backgroundColor: '#ffffff', padding: '40px', borderRadius: '10px',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', width: '350px',
      textAlign: 'center'
    },
    title: { fontSize: '1.8rem', color: '#1DB954', fontWeight: 'bold', marginBottom: '15px' },
    input: {
      width: '100%', padding: '10px', margin: '8px 0',
      border: '1px solid #ddd', borderRadius: '5px',
      fontSize: '1rem', outline: 'none',
      transition: 'border 0.3s ease',
    },
    inputFocus: { border: '1px solid #1DB954' },
    select: { width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '1rem' },
    button: {
      backgroundColor: '#1DB954', color: 'white',
      padding: '12px', borderRadius: '6px', border: 'none',
      fontSize: '1rem', cursor: 'pointer', marginTop: '15px',
      width: '100%', transition: 'background 0.3s ease',
    },
    buttonHover: { backgroundColor: '#148C42' },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formCard}>
        <h2 style={styles.title}>Sign Up</h2>
        <form onSubmit={handlesignup}>
          <input type="text" placeholder="Name" style={styles.input} value={signupData.name}
            onChange={(e) => setSignupData({ ...signupData, name: e.target.value })} required />
          <input type="email" placeholder="Email" style={styles.input} value={signupData.email}
            onChange={(e) => setSignupData({ ...signupData, email: e.target.value })} required />
          <input type="password" placeholder="Password" style={styles.input} value={signupData.password}
            onChange={(e) => setSignupData({ ...signupData, password: e.target.value })} required />
          <input type="text" placeholder="Phone" style={styles.input} value={signupData.phone}
            onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })} required />
          <select style={styles.select} value={signupData.role}
            onChange={(e) => setSignupData({ ...signupData, role: e.target.value })}>
            <option value="customer">Customer</option>
            <option value="grocery_owner">Grocery Owner</option>
            <option value="saloon_owner">Salon Owner</option>
            <option value="renting_broker">Renting Broker</option>
            <option value="service_provider">Service Provider</option>
          </select>
          <input type="text" placeholder="Address" style={styles.input} value={signupData.address}
            onChange={(e) => setSignupData({ ...signupData, address: e.target.value })} required />
          <input type="text" placeholder="Pincode" style={styles.input} value={signupData.pincode}
            onChange={(e) => setSignupData({ ...signupData, pincode: e.target.value })} required />
          <button type="submit" style={styles.button}>Sign Up</button>
        </form>
      </div>
    </div>
  );

}

export default Signup