// import React, { useState, useEffect } from 'react';
// import Navbar from './Navbar';

// const Getrentinghouse = () => {
//   const [houses, setHouses] = useState([]);
//   const [role, setRole] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [formData, setFormData] = useState({
//     name: '',
//     rentPerMonth: '',
//     advanceAmount: '',
//     description: '',
//     address: '',
//     pincode: '',
//     image: '',
//   });
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [editId, setEditId] = useState(null);

//   useEffect(() => {
//     const fetchRoleAndHouses = async () => {
//       try {
//         const res = await fetch('http://localhost:8000/api/auth/cookie', {
//           method: 'GET',
//           credentials: 'include',
//         });
//         const data = await res.json();

//         if (res.ok) {
//           const userRole = data.user.role;
//           setRole(userRole);

//           const endpoint =
//             userRole === 'renting_broker'
//               ? 'http://localhost:8000/api/user/myhouse'
//               : 'http://localhost:8000/api/user/renthouse';

//           const houseRes = await fetch(endpoint, {
//             method: 'GET',
//             credentials: 'include',
//           });

//           const houseData = await houseRes.json();
//           if (houseRes.ok) {
//             setHouses(houseData);
//           } else {
//             console.error(houseData.message);
//           }
//         } else {
//           console.error(data.message);
//         }
//       } catch (err) {
//         console.error('Failed to fetch role and houses:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRoleAndHouses();
//   }, []);

//   const fetchHouses = async () => {
//     const endpoint =
//       role === 'renting_broker'
//         ? 'http://localhost:8000/api/user/myhouse'
//         : 'http://localhost:8000/api/user/renthouse';

//     const res = await fetch(endpoint, {
//       method: 'GET',
//       credentials: 'include',
//     });

//     const data = await res.json();
//     if (res.ok) setHouses(data);
//     else console.error(data.message);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const url = isEditMode
//       ? `http://localhost:8000/api/user/updatehouse/${editId}`
//       : 'http://localhost:8000/api/user/addhouse';

//     try {
//       const res = await fetch(url, {
//         method: isEditMode ? 'PUT' : 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         await fetchHouses();
//         setFormData({
//           name: '',
//           rentPerMonth: '',
//           advanceAmount: '',
//           description: '',
//           address: '',
//           pincode: '',
//           image: '',
//         });
//         setIsEditMode(false);
//         setEditId(null);
//       } else {
//         console.error(data.message);
//       }
//     } catch (err) {
//       console.error('Error submitting form:', err);
//     }
//   };

//   const handleEdit = (house) => {
//     setIsEditMode(true);
//     setEditId(house._id);
//     setFormData({
//       name: house.name,
//       rentPerMonth: house.rentPerMonth,
//       advanceAmount: house.advanceAmount,
//       description: house.description,
//       address: house.address,
//       pincode: house.pincode,
//       image: house.image,
//     });
//   };

//   const handleDelete = async (id) => {
//     try {
//       const res = await fetch(`http://localhost:8000/api/user/deletehouse/${id}`, {
//         method: 'DELETE',
//         credentials: 'include',
//       });
//       if (res.ok) {
//         await fetchHouses();
//       } else {
//         const data = await res.json();
//         console.error(data.message);
//       }
//     } catch (err) {
//       console.error('Error deleting house:', err);
//     }
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div style={{ padding: '1rem' }}>
//       <Navbar />
//       {role === 'renting_broker' && (
//         <>
//           <h2>{isEditMode ? 'Update Listing' : 'Add New Listing'}</h2>
//           <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
//             <input name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} required />
//             <input name="rentPerMonth" placeholder="Rent" value={formData.rentPerMonth} onChange={handleInputChange} required />
//             <input name="advanceAmount" placeholder="Advance" value={formData.advanceAmount} onChange={handleInputChange} required />
//             <input name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} required />
//             <input name="address" placeholder="Address" value={formData.address} onChange={handleInputChange} required />
//             <input name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleInputChange} required />
//             <input name="image" placeholder="Image URL" value={formData.image} onChange={handleInputChange} />
//             <button type="submit">{isEditMode ? 'Update' : 'Add'}</button>
//           </form>
//         </>
//       )}

//       <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '2rem', gap: '1rem' }}>
//         {houses.map((house) => (
//           <div key={house._id} style={{ border: '1px solid #ccc', padding: '1rem', width: '250px' }}>
//             <img
//               src={house.image}
//               alt={house.name}
//               style={{ width: '100%', height: '160px', objectFit: 'cover' }}
//             />
//             <h3>{house.name}</h3>
//             <p>{house.address}</p>
//             <p>Rent: ₹{house.rentPerMonth}</p>
//             <p>Advance: ₹{house.advanceAmount}</p>
//             {role !== 'renting_broker' &&
//             <button onClick={() => alert(`Email: ${house.email}\nPhone: ${house.phoneNumber}`)}>Contact</button> }
            
//             {role === 'renting_broker' && (
//               <>
//                 <button onClick={() => handleEdit(house)}>Edit</button>
//                 <button onClick={() => handleDelete(house._id)}>Delete</button>
//               </>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Getrentinghouse;


import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

const Getrentinghouse = () => {
  const [houses, setHouses] = useState([]);
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    rentPerMonth: '',
    advanceAmount: '',
    description: '',
    address: '',
    pincode: '',
    image: '',
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const fetchRoleAndHouses = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/auth/cookie', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await res.json();

        if (res.ok) {
          const userRole = data.user.role;
          setRole(userRole);

          const endpoint =
            userRole === 'renting_broker'
              ? 'http://localhost:8000/api/user/myhouse'
              : 'http://localhost:8000/api/user/renthouse';

          const houseRes = await fetch(endpoint, {
            method: 'GET',
            credentials: 'include',
          });

          const houseData = await houseRes.json();
          if (houseRes.ok) {
            setHouses(houseData);
          } else {
            console.error(houseData.message);
          }
        } else {
          console.error(data.message);
        }
      } catch (err) {
        console.error('Failed to fetch role and houses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoleAndHouses();
  }, []);

  const fetchHouses = async () => {
    const endpoint =
      role === 'renting_broker'
        ? 'http://localhost:8000/api/user/myhouse'
        : 'http://localhost:8000/api/user/renthouse';

    const res = await fetch(endpoint, {
      method: 'GET',
      credentials: 'include',
    });

    const data = await res.json();
    if (res.ok) setHouses(data);
    else console.error(data.message);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isEditMode
      ? `http://localhost:8000/api/user/updatehouse/${editId}`
      : 'http://localhost:8000/api/user/addhouse';

    try {
      const res = await fetch(url, {
        method: isEditMode ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        await fetchHouses();
        setFormData({
          name: '',
          rentPerMonth: '',
          advanceAmount: '',
          description: '',
          address: '',
          pincode: '',
          image: '',
        });
        setIsEditMode(false);
        setEditId(null);
        setIsFormVisible(false);
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  const handleEdit = (house) => {
    setIsEditMode(true);
    setEditId(house._id);
    setFormData({
      name: house.name,
      rentPerMonth: house.rentPerMonth,
      advanceAmount: house.advanceAmount,
      description: house.description,
      address: house.address,
      pincode: house.pincode,
      image: house.image,
    });
    setIsFormVisible(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/api/user/deletehouse/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (res.ok) {
        await fetchHouses();
      } else {
        const data = await res.json();
        console.error(data.message);
      }
    } catch (err) {
      console.error('Error deleting house:', err);
    }
  };

  const toggleForm = () => {
    if (isEditMode) {
      setIsEditMode(false);
      setEditId(null);
      setFormData({
        name: '',
        rentPerMonth: '',
        advanceAmount: '',
        description: '',
        address: '',
        pincode: '',
        image: '',
      });
    }
    setIsFormVisible(!isFormVisible);
  };

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading houses...</p>
    </div>
  );

  return (
    <div className="rental-app">
      <Navbar />
      
      <div className="container">
        <div className="header-section">
          <h1 className="page-title">
            {role === 'renting_broker' ? 'Manage Your Rental Listings' : 'Find Your Dream Home'}
          </h1>
          {role === 'renting_broker' && (
            <button 
              className="toggle-form-btn"
              onClick={toggleForm}
            >
              {isFormVisible 
                ? 'Hide Form' 
                : isEditMode 
                  ? 'Edit Listing' 
                  : 'Add New Listing'
              }
            </button>
          )}
        </div>

        {role === 'renting_broker' && isFormVisible && (
          <div className="form-container">
            <h2 className="form-title">{isEditMode ? 'Update Listing' : 'Add New Listing'}</h2>
            <form onSubmit={handleSubmit} className="property-form">
              <div className="form-group">
                <label htmlFor="name">Property Name</label>
                <input 
                  id="name"
                  name="name" 
                  placeholder="Enter property name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="rentPerMonth">Monthly Rent (₹)</label>
                  <input 
                    id="rentPerMonth"
                    name="rentPerMonth" 
                    type="number" 
                    placeholder="10000" 
                    value={formData.rentPerMonth} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="advanceAmount">Advance Amount (₹)</label>
                  <input 
                    id="advanceAmount"
                    name="advanceAmount" 
                    type="number" 
                    placeholder="50000" 
                    value={formData.advanceAmount} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea 
                  id="description"
                  name="description" 
                  placeholder="Describe your property..." 
                  value={formData.description} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input 
                  id="address"
                  name="address" 
                  placeholder="Full address" 
                  value={formData.address} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="pincode">Pincode</label>
                  <input 
                    id="pincode"
                    name="pincode" 
                    placeholder="560001" 
                    value={formData.pincode} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="image">Image URL</label>
                  <input 
                    id="image"
                    name="image" 
                    placeholder="https://example.com/image.jpg" 
                    value={formData.image} 
                    onChange={handleInputChange} 
                  />
                </div>
              </div>
              
              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  {isEditMode ? 'Update Property' : 'Add Property'}
                </button>
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={toggleForm}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <h2 className="section-title">
          {role === 'renting_broker' ? 'Your Listings' : 'Available Properties'}
        </h2>
        
        {houses.length === 0 ? (
          <div className="no-houses">
            <p>No properties available at the moment.</p>
          </div>
        ) : (
          <div className="houses-grid">
            {houses.map((house) => (
              <div key={house._id} className="house-card">
                <div className="house-image-container">
                  <img
                    src={house.image || 'https://via.placeholder.com/300x200?text=No+Image'}
                    alt={house.name}
                    className="house-image"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                    }}
                  />
                  <div className="house-price">₹{house.rentPerMonth}/month</div>
                </div>
                
                <div className="house-details">
                  <h3 className="house-name">{house.name}</h3>
                  <p className="house-location">
                    <i className="location-icon">📍</i> {house.address}
                  </p>
                  <p className="house-description">{house.description}</p>
                  <div className="house-meta">
                    <span className="house-advance">
                      <strong>Advance:</strong> ₹{house.advanceAmount}
                    </span>
                    <span className="house-pincode">
                      <strong>Pincode:</strong> {house.pincode}
                    </span>
                  </div>
                  
                  <div className="house-actions">
                    {role !== 'renting_broker' ? (
                      <button 
                        className="contact-btn"
                        onClick={() => alert(`Email: ${house.email}\nPhone: ${house.phoneNumber}`)}
                      >
                        Contact Owner
                      </button>
                    ) : (
                      <>
                        <button 
                          className="edit-btn"
                          onClick={() => handleEdit(house)}
                        >
                          Edit
                        </button>
                        <button 
                          className="delete-btn"
                          onClick={() => {
                            if (window.confirm('Are you sure you want to delete this listing?')) {
                              handleDelete(house._id);
                            }
                          }}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className="footer">
        <p>© 2023-2025 UniHub - Activity Point Program</p>
      </footer>
    </div>
  );
};

// Internal styles
const style = document.createElement('style');
style.textContent = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif;
  }

  :root {
    --primary-color: #5dab6f;
    --primary-light: #e6f3e8;
    --primary-dark: #418553;
    --accent-color: #f8b500;
    --text-color: #333333;
    --light-gray: #f5f5f5;
    --medium-gray: #dddddd;
    --dark-gray: #888888;
    --white: #ffffff;
    --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    --transition: all 0.3s ease;
  }

  body {
    background-color: var(--primary-light);
    color: var(--text-color);
  }

  .rental-app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 5rem;
    flex: 1;
  }

  /* Loading Animation */
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: var(--primary-light);
  }

  .loading-spinner {
    width: 50px;
    height: 50px;
    border: 5px solid var(--primary-light);
    border-top: 5px solid var(--primary-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* Header Section */
  .header-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding: 1rem 0;
    border-bottom: 2px solid var(--primary-color);
  }

  .page-title {
    color: var(--primary-dark);
    font-size: 2rem;
    animation: fadeIn 1s ease-out;
  }

  .toggle-form-btn {
    background-color: var(--primary-color);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    transition: var(--transition);
    box-shadow: var(--shadow);
  }

  .toggle-form-btn:hover {
    background-color: var(--primary-dark);
    transform: translateY(-2px);
  }

  /* Form Styles */
  .form-container {
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: var(--shadow);
    margin-bottom: 2rem;
    animation: slideDown 0.5s ease-out;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .form-title {
    color: var(--primary-dark);
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid var(--primary-light);
  }

  .property-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex: 1;
  }

  .form-row {
    display: flex;
    gap: 1rem;
  }

  .property-form label {
    font-weight: 500;
    color: var(--primary-dark);
  }

  .property-form input,
  .property-form textarea {
    padding: 0.75rem;
    border: 1px solid var(--medium-gray);
    border-radius: 4px;
    font-size: 1rem;
    transition: var(--transition);
  }

  .property-form textarea {
    min-height: 100px;
    resize: vertical;
  }

  .property-form input:focus,
  .property-form textarea:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(93, 171, 111, 0.2);
  }

  .form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }

  .submit-btn,
  .cancel-btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;
    transition: var(--transition);
  }

  .submit-btn {
    background-color: var(--primary-color);
    color: white;
    flex: 2;
  }

  .submit-btn:hover {
    background-color: var(--primary-dark);
    transform: translateY(-2px);
  }

  .cancel-btn {
    background-color: var(--light-gray);
    color: var(--text-color);
    flex: 1;
  }

  .cancel-btn:hover {
    background-color: var(--medium-gray);
  }

  /* Houses Section */
  .section-title {
    color: var(--primary-dark);
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
  }

  .no-houses {
    background-color: white;
    padding: 2rem;
    text-align: center;
    border-radius: 8px;
    box-shadow: var(--shadow);
  }

  .houses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  justify-content: start; /* Aligns the grid to the left */
}

  .house-card {
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: var(--shadow);
    transition: var(--transition);
    animation: fadeIn 0.5s ease-out;
    position: relative;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .house-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }

  .house-image-container {
    position: relative;
    height: 200px;
    overflow: hidden;
  }

  .house-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  .house-card:hover .house-image {
    transform: scale(1.05);
  }

  .house-price {
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: var(--primary-color);
    color: white;
    padding: 0.5rem 1rem;
    font-weight: bold;
    border-top-left-radius: 8px;
  }

  .house-details {
    padding: 1.5rem;
  }

  .house-name {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    color: var(--primary-dark);
  }

  .house-location {
    display: flex;
    align-items: center;
    color: var(--dark-gray);
    margin-bottom: 1rem;
    font-size: 0.9rem;
  }

  .location-icon {
    margin-right: 0.25rem;
  }

  .house-description {
    margin-bottom: 1rem;
    font-size: 0.9rem;
    color: var(--text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .house-meta {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    font-size: 0.85rem;
  }

  .house-actions {
    display: flex;
    gap: 0.5rem;
  }

  .contact-btn,
  .edit-btn,
  .delete-btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    font-size: 0.9rem;
    transition: var(--transition);
    flex: 1;
    text-align: center;
  }

  .contact-btn {
    background-color: var(--primary-color);
    color: white;
  }

  .contact-btn:hover {
    background-color: var(--primary-dark);
  }

  .edit-btn {
    background-color: var(--primary-light);
    color: var(--primary-dark);
  }

  .edit-btn:hover {
    background-color: var(--primary-color);
    color: white;
  }

  .delete-btn {
    background-color: #ffebee;
    color: #d32f2f;
  }

  .delete-btn:hover {
    background-color: #d32f2f;
    color: white;
  }

  /* Footer */
  .footer {
    background-color: var(--primary-color);
    color: white;
    text-align: center;
    padding: 1.5rem;
    margin-top: 3rem;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .form-row {
      flex-direction: column;
    }
    
    .houses-grid {
      grid-template-columns: 1fr;
    }
    
    .header-section {
      flex-direction: column;
      gap: 1rem;
      align-items: flex-start;
    }
  }
`;

document.head.appendChild(style);

export default Getrentinghouse;
