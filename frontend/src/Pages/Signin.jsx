import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    
    const signinData = { email, password };

    try {
      const response = await fetch('http://localhost:8000/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signinData),
        credentials: 'include'
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Signin successful:', data);
        alert('Signin successful!');
        navigate('/landingPage');
        // You can store the token in localStorage or context for authentication
      } else {
        console.error('Signin failed:', data.message);
        alert(data.message || 'Signin failed');
      }
    } catch (error) {
      console.error('Error during signin:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Sign In</h2>
      <form onSubmit={handleSignIn} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>Sign In</button>
      </form>
      <p style={styles.text}>
        Don't have an account? <Link to="/signup" style={styles.link}>Sign Up</Link>
      </p>
      <Link to="/" style={styles.backLink}>← Back to Home</Link>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f8f9fa',
    fontFamily: 'sans-serif',
    textAlign: 'center'
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#144D36',
    marginBottom: '20px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    gap: '15px'
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc'
  },
  button: {
    padding: '12px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#1DB954',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: '0.3s',
  },
  text: {
    fontSize: '14px',
    marginTop: '10px'
  },
  link: {
    color: '#1DB954',
    textDecoration: 'none',
    fontWeight: 'bold'
  },
  backLink: {
    marginTop: '20px',
    textDecoration: 'none',
    color: '#144D36',
    fontSize: '14px'
  }
};

export default SignIn;
