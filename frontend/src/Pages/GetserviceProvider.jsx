// import React, { useState, useEffect } from 'react';

// import { motion, AnimatePresence } from 'framer-motion';
// import Navbar from './Navbar'; // Importing your existing Navbar

// const GetServiceProvider = () => {
//   const [services, setServices] = useState([]);
//   const [role, setRole] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [formData, setFormData] = useState({
//     name: '',
//     age: '',
//     phoneNumber: '',
//     description: '',
//     image: '',
//     category: '',
//     email: '',
//   });
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [editId, setEditId] = useState(null);
//   const [isFormVisible, setIsFormVisible] = useState(false);

//   // CSS Styles
//   const styles = {
//     container: {
//       fontFamily: 'sans-serif',
//       maxWidth: '1200px',
//       margin: '0 auto',
//       padding: '0 1rem',
//       color: '#333',
//       backgroundColor: 'white', // White background
//       minHeight: '100vh',
//     },
//     section: {
//       marginBottom: '3rem',
//       backgroundColor: '#f7fbf7', // Very light green background
//       padding: '2rem',
//       borderRadius: '12px',
//     },
//     sectionHeader: {
//       fontSize: '2rem',
//       fontWeight: '600',
//       marginBottom: '1.5rem',
//       color: '#2c7a2c', // Darker green for headings
//     },
//     formContainer: {
//       backgroundColor: 'white',
//       padding: '2rem',
//       borderRadius: '12px',
//       boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
//       marginBottom: '3rem',
//       overflow: 'hidden',
//     },
//     form: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(2, 1fr)',
//       gap: '1rem',
//     },
//     input: {
//       width: '100%',
//       padding: '0.75rem 1rem',
//       fontSize: '1rem',
//       border: '1px solid #d2d2d7',
//       borderRadius: '8px',
//       outline: 'none',
//       transition: 'border-color 0.3s, box-shadow 0.3s',
//     },
//     select: {
//       width: '100%',
//       padding: '0.75rem 1rem',
//       fontSize: '1rem',
//       border: '1px solid #d2d2d7',
//       borderRadius: '8px',
//       outline: 'none',
//       backgroundColor: 'white',
//       cursor: 'pointer',
//       transition: 'border-color 0.3s, box-shadow 0.3s',
//     },
//     textArea: {
//       gridColumn: 'span 2',
//       padding: '0.75rem 1rem',
//       fontSize: '1rem',
//       border: '1px solid #d2d2d7',
//       borderRadius: '8px',
//       outline: 'none',
//       resize: 'vertical',
//       minHeight: '100px',
//       transition: 'border-color 0.3s, box-shadow 0.3s',
//     },
//     submitButton: {
//       gridColumn: 'span 2',
//       marginTop: '1rem',
//       padding: '0.75rem 1.5rem',
//       backgroundColor: '#4CAF50',
//       color: 'white',
//       border: 'none',
//       borderRadius: '8px',
//       fontSize: '1rem',
//       fontWeight: '500',
//       cursor: 'pointer',
//       transition: 'background-color 0.3s, transform 0.2s',
//     },
//     formToggle: {
//       backgroundColor: '#4CAF50',
//       color: 'white',
//       border: 'none',
//       borderRadius: '8px',
//       padding: '0.75rem 1.5rem',
//       fontSize: '1rem',
//       fontWeight: '500',
//       cursor: 'pointer',
//       marginBottom: '1rem',
//       transition: 'background-color 0.3s, transform 0.2s',
//     },
//     servicesGrid: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
//       gap: '2rem',
//     },
//     serviceCard: {
//       backgroundColor: 'white',
//       borderRadius: '12px',
//       overflow: 'hidden',
//       boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
//       transition: 'transform 0.3s, box-shadow 0.3s',
//       border: '1px solid #e0f2e0', // Light green border
//     },
//     serviceImage: {
//       width: '100%',
//       height: '200px',
//       objectFit: 'cover',
//     },
//     serviceContent: {
//       padding: '1.5rem',
//     },
//     serviceTitle: {
//       fontSize: '1.25rem',
//       fontWeight: '600',
//       marginBottom: '0.5rem',
//       color: '#2c7a2c', // Darker green for titles
//     },
//     serviceDetail: {
//       fontSize: '0.9rem',
//       color: '#515154',
//       margin: '0.25rem 0',
//     },
//     categoryBadge: {
//       display: 'inline-block',
//       padding: '0.35rem 0.75rem',
//       backgroundColor: '#e8f5e9', // Light green background
//       color: '#2c7a2c', // Darker green text
//       borderRadius: '16px',
//       fontSize: '0.8rem',
//       fontWeight: '500',
//       marginTop: '0.5rem',
//     },
//     actionButtons: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       marginTop: '1.5rem',
//     },
//     editButton: {
//       padding: '0.5rem 1rem',
//       backgroundColor: '#e8f5e9', // Light green
//       color: '#2c7a2c', // Darker green
//       border: 'none',
//       borderRadius: '6px',
//       fontSize: '0.9rem',
//       fontWeight: '500',
//       cursor: 'pointer',
//       transition: 'background-color 0.3s',
//     },
//     deleteButton: {
//       padding: '0.5rem 1rem',
//       backgroundColor: '#ffebeb',
//       color: '#ff3b30',
//       border: 'none',
//       borderRadius: '6px',
//       fontSize: '0.9rem',
//       fontWeight: '500',
//       cursor: 'pointer',
//       transition: 'background-color 0.3s, color 0.3s',
//     },
//     loading: {
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       height: '70vh',
//       fontSize: '1.25rem',
//       color: '#4CAF50',
//     },
//     emptyState: {
//       textAlign: 'center',
//       padding: '3rem',
//       fontSize: '1.25rem',
//       color: '#8e8e93',
//       backgroundColor: 'white',
//       borderRadius: '12px',
//     }
//   };

//   useEffect(() => {
//     const fetchRoleAndServices = async () => {
//       try {
//         const res = await fetch('http://localhost:8000/api/auth/cookie', {
//           method: 'GET',
//           credentials: 'include',
//         });
//         const data = await res.json();

//         if (res.ok) {
//           setRole(data.user.role);
//           setFormData((prev) => ({
//             ...prev,
//             email: data.user.email,
//             phoneNumber: data.user.phoneNumber,
//           }));

//           const endpoint =
//             data.user.role === 'service_provider'
//               ? 'http://localhost:8000/api/user/myservice'
//               : 'http://localhost:8000/api/user/service';

//           const serviceRes = await fetch(endpoint, {
//             method: 'GET',
//             credentials: 'include',
//           });

//           const serviceData = await serviceRes.json();
//           if (serviceRes.ok) {
//             setServices(serviceData);
//           } else {
//             console.error(serviceData.message);
//           }
//         } else {
//           console.error(data.message);
//         }
//       } catch (err) {
//         console.error('Failed to fetch role and services:', err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchRoleAndServices();
//   }, []);

//   const fetchServices = async () => {
//     const endpoint =
//       role === 'service_provider'
//         ? 'http://localhost:8000/api/user/myservice'
//         : 'http://localhost:8000/api/user/service';

//     const res = await fetch(endpoint, {
//       method: 'GET',
//       credentials: 'include',
//     });

//     const data = await res.json();
//     if (res.ok) setServices(data);
//     else console.error(data.message);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     // Check if category already exists but allow updates for the same service
//     if (!isEditMode && services.some(service => service.category === formData.category)) {
//       alert('You can only have one service per category.');
//       return;
//     }
  
//     if (
//       isEditMode &&
//       services.some(
//         (service) =>
//           service.category === formData.category && service._id !== editId
//       )
//     ) {
//       alert('You can only have one service per category.');
//       return;
//     }
  
//     const url = isEditMode
//       ? `http://localhost:8000/api/user/updateservice/${editId}`
//       : 'http://localhost:8000/api/user/addservice';
  
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
//         await fetchServices();
//         setFormData({
//           name: '',
//           age: '',
//           phoneNumber: '',
//           description: '',
//           image: '',
//           category: '',
//           email: formData.email, // Keep the email since it's from the user profile
//         });
//         setIsEditMode(false);
//         setEditId(null);
//         setIsFormVisible(false);
//       } else {
//         console.error(data.message);
//       }
//     } catch (err) {
//       console.error('Error submitting form:', err);
//     }
//   };

//   const handleEdit = (service) => {
//     setIsEditMode(true);
//     setEditId(service._id);
//     setFormData({
//       name: service.name,
//       age: service.age,
//       phoneNumber: service.phoneNumber,
//       description: service.description,
//       image: service.image,
//       category: service.category,
//       email: service.email,
//     });
//     setIsFormVisible(true);
    
//     // Scroll to form
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth'
//     });
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this service?')) {
//       return;
//     }
    
//     try {
//       const res = await fetch(`http://localhost:8000/api/user/deleteservice/${id}`, {
//         method: 'DELETE',
//         credentials: 'include',
//       });
//       if (res.ok) {
//         await fetchServices();
//       } else {
//         const data = await res.json();
//         console.error(data.message);
//       }
//     } catch (err) {
//       console.error('Error deleting service:', err);
//     }
//   };
  
//   const resetForm = () => {
//     setFormData({
//       name: '',
//       age: '',
//       phoneNumber: '',
//       description: '',
//       image: '',
//       category: '',
//       email: formData.email, // Keep the email since it's from the user profile
//     });
//     setIsEditMode(false);
//     setEditId(null);
//   };

//   const toggleForm = () => {
//     if (isFormVisible && isEditMode) {
//       resetForm();
//     }
//     setIsFormVisible(!isFormVisible);
//   };

//   if (loading) {
//     return (
//       <div style={styles.container}>
//         <Navbar />
//         <div style={styles.loading}>
//           <div>
//             <svg width="40" height="40" viewBox="0 0 50 50">
//               <circle cx="25" cy="25" r="20" fill="none" stroke="#4CAF50" strokeWidth="5" strokeLinecap="round">
//                 <animateTransform
//                   attributeName="transform"
//                   type="rotate"
//                   from="0 25 25"
//                   to="360 25 25"
//                   dur="1s"
//                   repeatCount="indefinite"
//                 />
//               </circle>
//             </svg>
//             <p style={{ marginTop: '1rem' }}>Loading services...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Card animations
//   const cardVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: { 
//         duration: 0.5,
//       }
//     },
//     hover: {
//       y: -10,
//       boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
//       transition: {
//         duration: 0.3
//       }
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <Navbar />
      
//       {role === 'service_provider' && (
//         <div style={styles.section}>
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
//             <h2 style={styles.sectionHeader}>Your Services</h2>
//             <motion.button 
//               style={styles.formToggle}
//               whileHover={{ scale: 1.05, backgroundColor: '#3b8a3f' }}
//               whileTap={{ scale: 0.95 }}
//               onClick={toggleForm}
//             >
//               {isFormVisible ? 'Hide Form' : isEditMode ? 'Cancel Edit' : 'Add New Service'}
//             </motion.button>
//           </div>
          
//           <AnimatePresence>
//             {isFormVisible && (
//               <motion.div 
//                 style={styles.formContainer}
//                 initial={{ height: 0, opacity: 0 }}
//                 animate={{ height: 'auto', opacity: 1 }}
//                 exit={{ height: 0, opacity: 0 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#2c7a2c' }}>
//                   {isEditMode ? 'Update Service' : 'Add New Service'}
//                 </h3>
//                 <form onSubmit={handleSubmit} style={styles.form}>
//                   <input 
//                     name="name" 
//                     placeholder="Service Name" 
//                     value={formData.name} 
//                     onChange={handleInputChange} 
//                     required 
//                     style={styles.input}
//                   />
//                   <input 
//                     name="age" 
//                     placeholder="Age" 
//                     type="number"
//                     value={formData.age} 
//                     onChange={handleInputChange} 
//                     required 
//                     style={styles.input}
//                   />
//                   <input 
//                     name="image" 
//                     placeholder="Image URL" 
//                     value={formData.image} 
//                     onChange={handleInputChange} 
//                     required 
//                     style={styles.input}
//                   />
//                   <select 
//                     name="category" 
//                     value={formData.category} 
//                     onChange={handleInputChange} 
//                     required
//                     style={styles.select}
//                   >
//                     <option value="">Select Category</option>
//                     <option value="Plumber">Plumber</option>
//                     <option value="Electrician">Electrician</option>
//                     <option value="Carpenter">Carpenter</option>
//                     <option value="Mechanic">Mechanic</option>
//                   </select>
//                   <textarea 
//                     name="description" 
//                     placeholder="Description" 
//                     value={formData.description} 
//                     onChange={handleInputChange} 
//                     required 
//                     style={styles.textArea}
//                   />
//                   <motion.button 
//                     type="submit" 
//                     style={styles.submitButton}
//                     whileHover={{ scale: 1.05, backgroundColor: '#3b8a3f' }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     {isEditMode ? 'Update Service' : 'Add Service'}
//                   </motion.button>
//                 </form>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       )}
      
//       <div style={styles.section}>
//         <h2 style={styles.sectionHeader}>
//           {role === 'service_provider' ? 'Your Services' : 'Available Services'}
//         </h2>
        
//         {services.length === 0 ? (
//           <div style={styles.emptyState}>
//             <p>No services available at the moment.</p>
//             {role === 'service_provider' && (
//               <motion.button 
//                 style={{...styles.formToggle, marginTop: '1rem'}}
//                 whileHover={{ scale: 1.05, backgroundColor: '#3b8a3f' }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => setIsFormVisible(true)}
//               >
//                 Add Your First Service
//               </motion.button>
//             )}
//           </div>
//         ) : (
//           <div style={styles.servicesGrid}>
//             {services.map((service, index) => (
//               <motion.div 
//                 key={service._id}
//                 variants={cardVariants}
//                 initial="hidden"
//                 animate="visible"
//                 whileHover="hover"
//                 transition={{ delay: index * 0.1 }}
//                 style={styles.serviceCard}
//               >
//                 <img 
//                   src={service.image} 
//                   alt={service.name} 
//                   style={styles.serviceImage} 
//                   onError={(e) => {
//                     e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
//                   }}
//                 />
//                 <div style={styles.serviceContent}>
//                   <h3 style={styles.serviceTitle}>{service.name}</h3>
//                   <div style={styles.categoryBadge}>{service.category}</div>
//                   <p style={{...styles.serviceDetail, marginTop: '1rem'}}>{service.description}</p>
//                   <p style={styles.serviceDetail}>Age: {service.age}</p>
//                   <p style={styles.serviceDetail}>
//                     <strong>Contact:</strong> {service.phoneNumber}
//                   </p>
//                   <p style={styles.serviceDetail}>
//                     <strong>Email:</strong> {service.email}
//                   </p>
                  
//                   {role === 'service_provider' && (
//                     <div style={styles.actionButtons}>
//                       <motion.button 
//                         onClick={() => handleEdit(service)}
//                         style={styles.editButton}
//                         whileHover={{ backgroundColor: '#d0e9d0', scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                       >
//                         Edit
//                       </motion.button>
//                       <motion.button 
//                         onClick={() => handleDelete(service._id)}
//                         style={styles.deleteButton}
//                         whileHover={{ backgroundColor: '#ffdbdb', scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                       >
//                         Delete
//                       </motion.button>
//                     </div>
//                   )}
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default GetServiceProvider;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar'; 
const GetServiceProvider = () => {
  const [services, setServices] = useState([]);
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    phoneNumber: '',
    description: '',
    image: '',
    category: '',
    email: '',
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  // CSS Styles
  const styles = {
    container: {
      fontFamily: 'sans-serif',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem',
      color: '#333',
      backgroundColor: 'white', // White background
      minHeight: '100vh',
    },
    section: {
      marginTop:'6rem',
      marginBottom: '3rem',
      backgroundColor: '#f7fbf7', // Very light green background
      padding: '2rem',
      borderRadius: '12px',
    },
    sectionHeader: {
      fontSize: '2rem',
      fontWeight: '600',
      marginBottom: '1.5rem',
      color: '#2c7a2c', // Darker green for headings
    },
    formContainer: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      marginBottom: '3rem',
      overflow: 'hidden',
    },
    form: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '1rem',
    },
    input: {
      width: '80%',
      marginLeft:'2.5rem',
      padding: '0.75rem 1rem',
      fontSize: '1rem',
      border: '1px solid #d2d2d7',
      borderRadius: '8px',
      outline: 'none',
      transition: 'border-color 0.3s, box-shadow 0.3s',
    },
    select: {
      width: '87%',
      marginLeft:'2.5rem',
      padding: '0.75rem 1rem',
      fontSize: '1rem',
      border: '1px solid #d2d2d7',
      borderRadius: '8px',
      outline: 'none',
      backgroundColor: 'white',
      cursor: 'pointer',
      transition: 'border-color 0.3s, box-shadow 0.3s',
    },
    textArea: {
      width:'45%',
      marginLeft:'2.5rem',
      gridColumn: 'span 2',
      padding: '0.75rem 1rem',
      fontSize: '1rem',
      border: '1px solid #d2d2d7',
      borderRadius: '8px',
      outline: 'none',
      resize: 'vertical',
      minHeight: '100px',
      transition: 'border-color 0.3s, box-shadow 0.3s',
    },
    submitButton: {
      width:'50%',
      marginLeft:'15rem',
      gridColumn: 'span 2',
      marginTop: '1rem',
      padding: '0.75rem 1.5rem',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.3s, transform 0.2s',
    },
    formToggle: {
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '0.75rem 1.5rem',
      fontSize: '1rem',
      fontWeight: '500',
      cursor: 'pointer',
      marginBottom: '1rem',
      transition: 'background-color 0.3s, transform 0.2s',
    },
    servicesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '2rem',
    },
    serviceCard: {
      backgroundColor: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      transition: 'transform 0.3s, box-shadow 0.3s',
      border: '1px solid #e0f2e0', // Light green border
    },
    serviceImage: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
    },
    serviceContent: {
      padding: '1.5rem',
    },
    serviceTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      marginBottom: '0.5rem',
      color: '#2c7a2c', // Darker green for titles
    },
    serviceDetail: {
      fontSize: '0.9rem',
      color: '#515154',
      margin: '0.25rem 0',
    },
    categoryBadge: {
      display: 'inline-block',
      padding: '0.35rem 0.75rem',
      backgroundColor: '#e8f5e9', // Light green background
      color: '#2c7a2c', // Darker green text
      borderRadius: '16px',
      fontSize: '0.8rem',
      fontWeight: '500',
      marginTop: '0.5rem',
    },
    actionButtons: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '1.5rem',
    },
    editButton: {
      padding: '0.5rem 1rem',
      backgroundColor: '#e8f5e9', // Light green
      color: '#2c7a2c', // Darker green
      border: 'none',
      borderRadius: '6px',
      fontSize: '0.9rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    deleteButton: {
      padding: '0.5rem 1rem',
      backgroundColor: '#ffebeb',
      color: '#ff3b30',
      border: 'none',
      borderRadius: '6px',
      fontSize: '0.9rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.3s, color 0.3s',
    },
    loading: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '70vh',
      fontSize: '1.25rem',
      color: '#4CAF50',
    },
    emptyState: {
      textAlign: 'center',
      padding: '3rem',
      fontSize: '1.25rem',
      color: '#8e8e93',
      backgroundColor: 'white',
      borderRadius: '12px',
    }
  };

  useEffect(() => {
    const fetchRoleAndServices = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/auth/cookie', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await res.json();

        if (res.ok) {
          setRole(data.user.role);
          setFormData((prev) => ({
            ...prev,
            email: data.user.email,
            phoneNumber: data.user.phoneNumber,
          }));

          const endpoint =
            data.user.role === 'service_provider'
              ? 'http://localhost:8000/api/user/myservice'
              : 'http://localhost:8000/api/user/service';

          const serviceRes = await fetch(endpoint, {
            method: 'GET',
            credentials: 'include',
          });

          const serviceData = await serviceRes.json();
          if (serviceRes.ok) {
            setServices(serviceData);
          } else {
            console.error(serviceData.message);
          }
        } else {
          console.error(data.message);
        }
      } catch (err) {
        console.error('Failed to fetch role and services:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRoleAndServices();
  }, []);

  const fetchServices = async () => {
    try {
      const endpoint =
        role === 'service_provider'
          ? 'http://localhost:8000/api/user/myservice'
          : 'http://localhost:8000/api/user/service';

      const res = await fetch(endpoint, {
        method: 'GET',
        credentials: 'include',
      });

      const data = await res.json();
      if (res.ok) {
        setServices(data);
      } else {
        console.error(data.message);
        alert('Failed to fetch services: ' + data.message);
      }
    } catch (err) {
      console.error('Error fetching services:', err);
      alert('Error fetching services. Check console for details.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if category already exists but allow updates for the same service
    if (!isEditMode && services.some(service => service.category === formData.category)) {
      alert('You can only have one service per category.');
      return;
    }
  
    if (
      isEditMode &&
      services.some(
        (service) =>
          service.category === formData.category && service._id !== editId
      )
    ) {
      alert('You can only have one service per category.');
      return;
    }
  
    try {
      const url = isEditMode
        ? `http://localhost:8000/api/user/updateservice/${editId}`
        : 'http://localhost:8000/api/user/addservice';
      
      console.log('Submitting to:', url);
      console.log('Form data:', formData);
      console.log('Edit mode:', isEditMode);
      
      const res = await fetch(url, {
        method: isEditMode ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
      console.log('Response:', data);
      
      if (res.ok) {
        alert(isEditMode ? 'Service updated successfully!' : 'Service added successfully!');
        await fetchServices();
        setFormData({
          name: '',
          age: '',
          phoneNumber: '',
          description: '',
          image: '',
          category: '',
          email: formData.email, // Keep the email since it's from the user profile
        });
        setIsEditMode(false);
        setEditId(null);
        setIsFormVisible(false);
      } else {
        console.error(data.message);
        alert('Error: ' + data.message);
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      alert('An error occurred. Please check the console for details.');
    }
  };

  const handleEdit = (service) => {
    console.log('Editing service:', service);
    setIsEditMode(true);
    setEditId(service._id);
    setFormData({
      name: service.name,
      age: service.age,
      phoneNumber: service.phoneNumber,
      description: service.description,
      image: service.image,
      category: service.category,
      email: service.email,
    });
    setIsFormVisible(true);
    
    // Scroll to form
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) {
      return;
    }
    
    try {
      console.log('Deleting service with ID:', id);
      const res = await fetch(`http://localhost:8000/api/user/deleteservice/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      
      if (res.ok) {
        alert('Service deleted successfully!');
        await fetchServices();
      } else {
        const data = await res.json();
        console.error(data.message);
        alert('Failed to delete service: ' + data.message);
      }
    } catch (err) {
      console.error('Error deleting service:', err);
      alert('An error occurred while deleting. Please check the console for details.');
    }
  };
  
  const resetForm = () => {
    setFormData({
      name: '',
      age: '',
      phoneNumber: '',
      description: '',
      image: '',
      category: '',
      email: formData.email, 
    });
    setIsEditMode(false);
    setEditId(null);
  };

  const toggleForm = () => {
    if (isFormVisible && isEditMode) {
      resetForm();
    }
    setIsFormVisible(!isFormVisible);
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <Navbar />
        <div style={styles.loading}>
          <div>
            <svg width="40" height="40" viewBox="0 0 50 50">
              <circle cx="25" cy="25" r="20" fill="none" stroke="#4CAF50" strokeWidth="5" strokeLinecap="round">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 25 25"
                  to="360 25 25"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
            <p style={{ marginTop: '1rem' }}>Loading services...</p>
          </div>
        </div>
      </div>
    );
  }

  // Card animations
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
      }
    },
    hover: {
      y: -10,
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div style={styles.container}>
      <Navbar />
      
      {role === 'service_provider' && (
        <div style={styles.section}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={styles.sectionHeader}>
              {isFormVisible ? (isEditMode ? 'Edit Service' : 'Add New Service') : 'Add New Service'}
            </h2>
            <motion.button 
              style={styles.formToggle}
              whileHover={{ scale: 1.05, backgroundColor: '#3b8a3f' }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleForm}
            >
              {isFormVisible ? 'Cancel' : 'Add New Service'}
            </motion.button>
          </div>
          
          <AnimatePresence>
            {isFormVisible && (
              <motion.div 
                style={styles.formContainer}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#2c7a2c' }}>
                  {isEditMode ? 'Update Service' : 'Add New Service'}
                </h3>
                <form onSubmit={handleSubmit} style={styles.form}>
                  <input 
                    name="name" 
                    placeholder="Service Name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    required 
                    style={styles.input}
                  />
                  <input 
                    name="age" 
                    placeholder="Age" 
                    type="number"
                    value={formData.age} 
                    onChange={handleInputChange} 
                    required 
                    style={styles.input}
                  />
                  <input 
                    name="image" 
                    placeholder="Image URL" 
                    value={formData.image} 
                    onChange={handleInputChange} 
                    required 
                    style={styles.input}
                  />
                  <select 
                    name="category" 
                    value={formData.category} 
                    onChange={handleInputChange} 
                    required
                    style={styles.select}
                  >
                    <option value="">Select Category</option>
                    <option value="Plumber">Plumber</option>
                    <option value="Electrician">Electrician</option>
                    <option value="Carpenter">Carpenter</option>
                    <option value="Mechanic">Mechanic</option>
                  </select>
                  <textarea 
                    name="description" 
                    placeholder="Description" 
                    value={formData.description} 
                    onChange={handleInputChange} 
                    required 
                    style={styles.textArea}
                  />
                  <motion.button 
                    type="submit" 
                    style={styles.submitButton}
                    whileHover={{ scale: 1.05, backgroundColor: '#3b8a3f' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isEditMode ? 'Update Service' : 'Add Service'}
                  </motion.button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
      
      <div style={styles.section}>
        <h2 style={styles.sectionHeader}>
          {role === 'service_provider' ? 'Your Services' : 'Available Services'}
        </h2>
        
        {services.length === 0 ? (
          <div style={styles.emptyState}>
            <p>No services available at the moment.</p>
            {role === 'service_provider' && (
              <motion.button 
                style={{...styles.formToggle, marginTop: '1rem'}}
                whileHover={{ scale: 1.05, backgroundColor: '#3b8a3f' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsFormVisible(true)}
              >
                Add Your First Service
              </motion.button>
            )}
          </div>
        ) : (
          <div style={styles.servicesGrid}>
            {services.map((service, index) => (
              <motion.div 
                key={service._id || index} // Fallback to index if _id is missing
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                transition={{ delay: index * 0.1 }}
                style={styles.serviceCard}
              >
                <img 
                  src={service.image} 
                  alt={service.name} 
                  style={styles.serviceImage} 
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                  }}
                />
                <div style={styles.serviceContent}>
                  <h3 style={styles.serviceTitle}>{service.name}</h3>
                  <div style={styles.categoryBadge}>{service.category}</div>
                  <p style={{...styles.serviceDetail, marginTop: '1rem'}}>{service.description}</p>
                  <p style={styles.serviceDetail}><strong>Age:</strong> {service.age}</p>
                  <p style={styles.serviceDetail}>
                    <strong>Contact:</strong> {service.phoneNumber}
                  </p>
                  <p style={styles.serviceDetail}>
                    <strong>Email:</strong> {service.email}
                  </p>
                  
                  {role === 'service_provider' && (
                    <div style={styles.actionButtons}>
                      <motion.button 
                        onClick={() => handleEdit(service)}
                        style={styles.editButton}
                        whileHover={{ backgroundColor: '#d0e9d0', scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Edit
                      </motion.button>
                      <motion.button 
                        onClick={() => handleDelete(service._id)}
                        style={styles.deleteButton}
                        whileHover={{ backgroundColor: '#ffdbdb', scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Delete
                      </motion.button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GetServiceProvider;