import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const styles = {
    container: {
      fontFamily: 'sans-serif',
      backgroundColor: '#ffffff',
      color: '#222',
    },
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 60px',
      backgroundColor: '#ffffff',
      borderBottom: '2px solid #e0e0e0',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    logo: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      color: '#1DB954',
      letterSpacing: '1px',
    },
    navLinks: {
      display: 'flex',
      gap: '25px',
      listStyle: 'none',
      fontSize: '1rem',
      fontWeight: '500',
    },
    link: {
      textDecoration: 'none',
      color: '#333',
      fontWeight: '500',
      transition: 'color 0.3s ease',
    },
    linkHover: {
      color: '#1DB954',
    },
    btnGreen: {
      backgroundColor: '#1DB954',
      color: 'white',
      padding: '10px 22px',
      borderRadius: '6px',
      textDecoration: 'none',
      fontWeight: 'bold',
      transition: 'background 0.3s ease',
      border: 'none',
      cursor: 'pointer',
    },
    btnGreenHover: {
      backgroundColor: '#148C42',
    },
    hero: {
      textAlign: 'center',
      padding: '90px 20px',
      backgroundColor: '#f0fff0',
    },
    heroText: {
      fontSize: '2.8rem',
      fontWeight: 'bold',
      color: '#1DB954',
      marginBottom: '10px',
    },
    subText: {
      fontSize: '1.2rem',
      maxWidth: '650px',
      margin: '10px auto',
      color: '#555',
    },
    serviceContainer: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '25px',
      margin: '50px auto',
      padding: '20px',
    },
    card: {
      backgroundColor: '#ffffff',
      padding: '25px',
      borderRadius: '10px',
      boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)',
      width: '250px',
      textAlign: 'center',
      transition: 'transform 0.3s ease',
    },
    cardHover: {
      transform: 'translateY(-5px)',
    },
    aboutSection: {
      textAlign: 'center',
      padding: '80px 20px',
      backgroundColor: '#f8f9fa',
    },
    footer: {
      textAlign: 'center',
      padding: '20px',
      backgroundColor: '#1DB954',
      color: 'white',
      fontSize: '14px',
    },
  };

  return (
    <div style={styles.container}>
      
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.logo}>UniHub</div>
        {/* <ul style={styles.navLinks}>
          <li><Link to="/" style={styles.link}>Home</Link></li>
          <li><Link to="/services" style={styles.link}>Services</Link></li>
          <li><Link to="/about" style={styles.link}>About</Link></li>
          <li><Link to="/contact" style={styles.link}>Contact</Link></li>
        </ul> */}
        <div>
          <Link to="/signin" style={{ ...styles.link, marginRight: '10px' }}>Sign In</Link>
          <Link to="/signup" style={styles.btnGreen}>Sign Up</Link>


        </div>
      </nav>

      {/* Hero Section */}
      <section style={styles.hero}>
        <h1 style={styles.heroText}>Your Local Life, Simplified</h1>
        <p style={styles.subText}>
          Uni Hub connects you with essential neighborhood services—groceries, salons, service providers, and rentals—all in one place.
        </p>
        <div style={{ marginTop: '20px' }}>
          <Link to="/signin" style={styles.btnGreen}>Get Started →</Link>
        </div>
      </section>

      {/* Services Section */}
      <section>
        <h2 style={{ textAlign: 'center', marginTop: '50px', fontSize: '2rem' }}>Our Services</h2>
        <div style={styles.serviceContainer}>
          {[
            { title: "Grocery Delivery", desc: "Fresh groceries delivered to your door."},
            { title: "Saloon Services", desc: "Book top-rated salons in your neighborhood."},
            { title: "Service Providers", desc: "Find reliable technicians, cleaners, and more." },
            { title: "Rental Housing", desc: "Discover and book affordable housing nearby."},
          ].map((service, index) => (
            <div key={index} style={styles.card}>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              <Link to={service.link} style={styles.link}>Learn more →</Link>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section style={styles.aboutSection}>
        <h2>We Make Local Life Simpler</h2>
        <p style={styles.subText}>
          Uni Hub was created to connect residents with essential services, making everyday life easier and more efficient.
        </p>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>© 2025 Uni Hub - All Rights Reserved</p>
      </footer>

    </div>
  );
};

export default Home;
