
// import { Link ,useNavigate} from 'react-router-dom'

// const Navbar = () => {
//     const navigate = useNavigate();
//     const signout = async(e) => {
//         e.preventDefault();
//         try {
//             const response=await fetch('http://localhost:8000/api/auth/signout', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//             });
//             const data = await response.json();
//             if (response.ok) {
//                 console.log('Signout successful:', data);
//                 alert('Signout successful!');
//                 navigate('/');
//                 // You can store the token in localStorage or context for authentication
//               } else {
//                 console.error('Signout failed:', data.message);
//                 alert(data.message || 'Signout failed');
//               }

//         }
//         catch (error) {
//             console.error('Error during signout:', error);
//             alert('Something went wrong. Please try again.');
//         }
        
//     }
//   return (
//     <div>
//       <div>
//         <nav>
//           <Link to='/landingPage'>Home</Link>
//           <div onClick={signout}>Signout</div>
//         </nav>
//       </div>
//     </div>
//   )
// }

// export default Navbar
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const signout = async(e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/auth/signout', {
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
      } else {
        console.error('Signout failed:', data.message);
        alert(data.message || 'Signout failed');
      }
    }
    catch (error) {
      console.error('Error during signout:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 1000,
      transition: 'all 0.3s ease',
      fontFamily: '"Poppins", "Arial", sans-serif',
      backgroundColor: scrolled ? 'white' : 'rgba(255, 255, 255, 0.95)',
      boxShadow: scrolled ? '0 4px 12px rgba(0, 0, 0, 0.15)' : '0 2px 10px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        <nav style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '70px'
        }}>
          {/* Logo and Brand */}
          <div style={{
            display: 'flex',
            alignItems: 'center'
          }}>
            <Link to='/landingPage' style={{
              textDecoration: 'none',
              fontSize: '28px',
              fontWeight: 700,
              color: '#333',
              transition: 'transform 0.3s ease',
              transform: 'scale(1)'
            }} className="nav-logo">
              <span style={{ letterSpacing: '1px' }}>
                Uni<span style={{ color: '#2ecc71' }}>Hub</span>
              </span>
            </Link>
          </div>
          
          {/* Navigation and Signout */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '30px'
          }}>
            {/* Home link */}
            <Link 
              to='/landingPage' 
              style={{
                color: location.pathname === '/landingPage' ? '#2ecc71' : '#333',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: location.pathname === '/landingPage' ? 600 : 500,
                padding: '8px 0',
                position: 'relative',
                transition: 'color 0.3s ease',
              }}
              className="nav-link"
            >
              Home
              <div style={{
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '2px',
                background: '#2ecc71',
                transform: location.pathname === '/landingPage' ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'left',
                transition: 'transform 0.3s ease'
              }}></div>
            </Link>
            
            {/* Signout Button */}
            <button 
              onClick={signout}
              style={{
                backgroundColor: '#2ecc71',
                color: 'white',
                padding: '10px 24px',
                borderRadius: '30px',
                fontWeight: 600,
                fontSize: '16px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(46, 204, 113, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                letterSpacing: '0.5px',
                fontFamily: '"Poppins", sans-serif',
              }}
              className="signout-btn"
            >
              <span>Sign Out</span>
            </button>
          </div>
        </nav>
      </div>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
          
          .nav-logo:hover {
            transform: scale(1.05) !important;
          }
          
          .nav-link:hover {
            color: #2ecc71 !important;
          }
          
          .nav-link:hover::after {
            transform: scaleX(1) !important;
            transform-origin: left !important;
          }
          
          .signout-btn:hover {
            background-color: #27ae60 !important;
            transform: translateY(-3px) !important;
            box-shadow: 0 6px 15px rgba(46, 204, 113, 0.4) !important;
          }
          
          .signout-btn:active {
            transform: translateY(-1px) !important;
          }
          
          /* For smaller screens */
          @media (max-width: 600px) {
            .signout-btn {
              padding: 8px 16px !important;
              font-size: 14px !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Navbar;