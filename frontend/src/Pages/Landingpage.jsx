// // While using navbar and signout,if you try to comeback it coming back to the landing page.
// import React from 'react'
// import Navbar from './Navbar'
// import { Link,useNavigate } from 'react-router-dom';

// const Landingpage = () => {
//   const navigate = useNavigate();
//   return (
//     <div>
//       <Navbar/>
//       <h1>landing Page</h1>
//       {/* abhi */}
//       <Link to ='/grocery'>grocery</Link>
//       <Link to ='/getrenting'>renting</Link>
//       {/* akshay */}
//       <button>saloon</button>
//       <Link to ='/getservice'>Service</Link>
//     </div>
//   )
// }

// export default Landingpage

import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { Link, useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  // For animation on load
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Animation for scrolling elements
  const useElementOnScreen = (options) => {
    const [ref, setRef] = useState(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
        setVisible(entry.isIntersecting);
      }, options);

      if (ref) {
        observer.observe(ref);
      }

      return () => {
        if (ref) {
          observer.unobserve(ref);
        }
      };
    }, [ref, options]);

    return [setRef, visible];
  };

  const [heroRef, heroVisible] = useElementOnScreen({ threshold: 0.1 });
  const [servicesRef, servicesVisible] = useElementOnScreen({ threshold: 0.1 });
  const [ctaRef, ctaVisible] = useElementOnScreen({ threshold: 0.1 });
  const [aboutRef, aboutVisible] = useElementOnScreen({ threshold: 0.1 });

  const handleSalonClick = () => {
    navigate('/saloon');
  };

  // Lighter green color scheme
  const styles = {
    landingContainer: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f8f9fa',
      fontFamily: 'Arial, sans-serif',
    },
    heroSection: {
      background: 'linear-gradient(135deg, #6EB257, #A5D6A7)',
      color: 'white',
      textAlign: 'center',
      padding: '80px 20px',
      marginBottom: '40px',
      opacity: heroVisible ? 1 : 0,
      transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
    },
    heroTitle: {
      fontSize: '3.5rem',
      marginBottom: '1rem',
      textShadow: '1px 1px 3px rgba(0,0,0,0.2)',
    },
    heroText: {
      fontSize: '1.3rem',
      maxWidth: '700px',
      margin: '0 auto 1.5rem',
      lineHeight: '1.6',
    },
    servicesSection: {
      padding: '60px 20px',
      textAlign: 'center',
      backgroundColor: 'white',
      opacity: servicesVisible ? 1 : 0,
      transform: servicesVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
    },
    sectionTitle: {
      fontSize: '2.2rem',
      marginBottom: '1rem',
      color: '#4CAF50',
    },
    sectionSubtitle: {
      fontSize: '1.1rem',
      marginBottom: '2.5rem',
      color: '#666',
      maxWidth: '700px',
      margin: '0 auto 2.5rem',
    },
    servicesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '30px',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    serviceCard: {
      backgroundColor: 'white',
      borderRadius: '10px',
      padding: '30px 20px',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      border: '1px solid #e0e0e0',
    },
    serviceIcon: {
      fontSize: '2.7rem',
      marginBottom: '15px',
      color: '#6EB257',
    },
    serviceTitle: {
      fontSize: '1.5rem',
      marginBottom: '12px',
      color: '#4CAF50',
    },
    serviceText: {
      color: '#666',
      marginBottom: '20px',
      lineHeight: '1.5',
    },
    serviceLink: {
      display: 'inline-block',
      padding: '10px 24px',
      backgroundColor: '#6EB257',
      color: 'white',
      textDecoration: 'none',
      borderRadius: '50px',
      fontWeight: 'bold',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    },
    serviceButton: {
      display: 'inline-block',
      padding: '10px 24px',
      backgroundColor: '#6EB257',
      color: 'white',
      textDecoration: 'none',
      borderRadius: '50px',
      fontWeight: 'bold',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    },
    aboutSection: {
      padding: '60px 20px',
      backgroundColor: '#f8f9fa',
      textAlign: 'center',
      opacity: aboutVisible ? 1 : 0,
      transform: aboutVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
    },
    aboutContent: {
      maxWidth: '900px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    aboutText: {
      fontSize: '1.1rem',
      lineHeight: '1.7',
      color: '#555',
      marginBottom: '30px',
      textAlign: 'left',
    },
    featureRow: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '20px',
      marginTop: '30px',
    },
    featureItem: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'white',
      padding: '15px 20px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      width: 'calc(33.333% - 20px)',
      minWidth: '220px',
    },
    featureIcon: {
      fontSize: '1.5rem',
      color: '#6EB257',
      marginRight: '15px',
    },
    featureText: {
      fontWeight: 'bold',
      color: '#444',
    },
    ctaSection: {
      backgroundImage: 'linear-gradient(to right, rgba(110, 178, 87, 0.9), rgba(165, 214, 167, 0.9)), url(/api/placeholder/1200/400)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      textAlign: 'center',
      padding: '80px 20px',
      marginTop: '40px',
      color: 'white',
      opacity: ctaVisible ? 1 : 0,
      transform: ctaVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
    },
    ctaTitle: {
      fontSize: '2.5rem',
      marginBottom: '1rem',
      textShadow: '1px 1px 3px rgba(0,0,0,0.2)',
    },
    ctaText: {
      maxWidth: '700px',
      margin: '0 auto 2rem',
      fontSize: '1.2rem',
      lineHeight: '1.6',
    },
    ctaButton: {
      padding: '15px 35px',
      backgroundColor: 'white',
      color: '#4CAF50',
      border: 'none',
      borderRadius: '50px',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    },
    footer: {
      marginTop: 'auto',
      textAlign: 'center',
      padding: '25px 20px',
      backgroundColor: '#4a7c47',
      color: 'white',
    },
    footerContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    footerLinks: {
      display: 'flex',
      gap: '20px',
      marginBottom: '20px',
    },
    footerLink: {
      color: 'white',
      textDecoration: 'none',
    }
  };

  // Apply hover effect for cards
  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = 'translateY(-10px)';
    e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
  };

  // Apply hover effect for buttons
  const handleButtonHover = (e) => {
    e.currentTarget.style.backgroundColor = '#5ba049';
    e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15)';
    e.currentTarget.style.transform = 'translateY(-2px)';
  };

  const handleButtonLeave = (e) => {
    e.currentTarget.style.backgroundColor = '#6EB257';
    e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    e.currentTarget.style.transform = 'translateY(0)';
  };

  const handleCtaButtonHover = (e) => {
    e.currentTarget.style.backgroundColor = '#f8f9fa';
    e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.2)';
    e.currentTarget.style.transform = 'translateY(-2px)';
  };

  const handleCtaButtonLeave = (e) => {
    e.currentTarget.style.backgroundColor = 'white';
    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    e.currentTarget.style.transform = 'translateY(0)';
  };

  return (
    <div style={styles.landingContainer}>
      <Navbar />
      
      <div ref={heroRef} style={styles.heroSection}>
        <div>
          <h1 style={styles.heroTitle}>Welcome to Community Hub</h1>
          <p style={styles.heroText}>
            Your neighborhood companion offering essential services for local residents. 
            From daily groceries to housing, salon services, and skilled professionals, 
            we bring everything to your fingertips.
          </p>
          {/* <button 
            style={styles.ctaButton} 
            onClick={() => navigate('/signup')}
            onMouseEnter={handleCtaButtonHover}
            onMouseLeave={handleCtaButtonLeave}
          >
            Explore Services
          </button> */}
        </div>
      </div>

      <div ref={servicesRef} style={styles.servicesSection}>
        <h2 style={styles.sectionTitle}>Our Services</h2>
        <p style={styles.sectionSubtitle}>
          Community Hub simplifies daily life by connecting you with essential local services in one convenient platform. 
          Browse our offerings and discover how we can make your neighborhood experience better.
        </p>
        <div style={styles.servicesGrid}>
          <div 
            style={styles.serviceCard} 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div style={styles.serviceIcon}>🛒</div>
            <h3 style={styles.serviceTitle}>Grocery</h3>
            <p style={styles.serviceText}>
              Fresh groceries delivered to your doorstep within your neighborhood. Save time and focus on what matters most.
            </p>
            <Link 
              to="/grocery" 
              style={styles.serviceLink}
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
            >
              Order Now
            </Link>
          </div>

          <div 
            style={styles.serviceCard}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div style={styles.serviceIcon}>🏠</div>
            <h3 style={styles.serviceTitle}>Housing</h3>
            <p style={styles.serviceText}>
              Find the perfect accommodation in your locality. Verified listings with virtual tours and easy booking.
            </p>
            <Link 
              to="/getrenting" 
              style={styles.serviceLink}
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
            >
              Browse Listings
            </Link>
          </div>

          <div 
            style={styles.serviceCard}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div style={styles.serviceIcon}>✂️</div>
            <h3 style={styles.serviceTitle}>Salon</h3>
            <p style={styles.serviceText}>
              Professional styling and grooming services at affordable prices. Look your best with trusted local stylists.
            </p>
            <button 
              onClick={handleSalonClick} 
              style={styles.serviceButton}
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
            >
              Book Appointment
            </button>
          </div>

          <div 
            style={styles.serviceCard}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div style={styles.serviceIcon}>🔧</div>
            <h3 style={styles.serviceTitle}>Service Providers</h3>
            <p style={styles.serviceText}>
              Connect with reliable neighborhood professionals for repairs, maintenance, and other essential services.
            </p>
            <Link 
              to="/getservice" 
              style={styles.serviceLink}
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
            >
              Find Services
            </Link>
          </div>
        </div>
      </div>

      <div ref={aboutRef} style={styles.aboutSection}>
        <div style={styles.aboutContent}>
          <h2 style={styles.sectionTitle}>About Community Hub</h2>
          <p style={styles.sectionSubtitle}>
            Created by locals, for locals - making neighborhood life better one service at a time.
          </p>
          

          <div style={styles.featureRow}>
            <div style={styles.featureItem}>
              <span style={styles.featureIcon}>✓</span>
              <span style={styles.featureText}>Affordable pricing</span>
            </div>
            <div style={styles.featureItem}>
              <span style={styles.featureIcon}>✓</span>
              <span style={styles.featureText}>Vetted service providers</span>
            </div>
            <div style={styles.featureItem}>
              <span style={styles.featureIcon}>✓</span>
              <span style={styles.featureText}>Exclusive local deals</span>
            </div>
            <div style={styles.featureItem}>
              <span style={styles.featureIcon}>✓</span>
              <span style={styles.featureText}>24/7 support</span>
            </div>
          </div>
        </div>
      </div>

      <div ref={ctaRef} style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>Make Everyday Life Easier</h2>
        <p style={styles.ctaText}>
          Join thousands of residents in your area who are already saving time and enjoying more 
          convenience with Community Hub. Sign up today and discover how we can transform your local experience.
        </p>
        {/* <button 
          style={styles.ctaButton} 
          onClick={() => navigate('/signup')}
          onMouseEnter={handleCtaButtonHover}
          onMouseLeave={handleCtaButtonLeave}
        >
          Get Started
        </button> */}
      </div>

      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          {/* <div style={styles.footerLinks}>
            <Link to="/about" style={styles.footerLink}>About Us</Link>
            <Link to="/contact" style={styles.footerLink}>Contact</Link>
            <Link to="/privacy" style={styles.footerLink}>Privacy Policy</Link>
            <Link to="/terms" style={styles.footerLink}>Terms of Service</Link>
          </div> */}
          <p>© 2023-2025 UniHub - Activity Point Program</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;



