import React from 'react'
import { Link ,useNavigate} from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
    const signout = async(e) => {
        e.preventDefault();
        try {
            const response=await fetch('http://localhost:8000/api/auth/signout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Signout successful:', data);
                alert('Signout successful!');
                navigate('/');
                // You can store the token in localStorage or context for authentication
              } else {
                console.error('Signout failed:', data.message);
                alert(data.message || 'Signout failed');
              }

        }
        catch (error) {
            console.error('Error during signout:', error);
            alert('Something went wrong. Please try again.');
        }
        
    }
  return (
    <div>
      <div>
        <nav>
          <Link to='/landingPage'>Home</Link>
          <div onClick={signout}>Signout</div>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
