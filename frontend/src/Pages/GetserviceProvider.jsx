// import React, { useState, useEffect } from 'react';
// import Navbar from './Navbar';

// const GetserviceProvider = () => {
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
//         : 'http://localhost:8000/api/user/allservice';

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
//           email: '',
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
//   };

//   const handleDelete = async (id) => {
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

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div style={{ padding: '1rem' }}>
//       <Navbar />
//       {role === 'service_provider' && (
//         <>
//           <h2>{isEditMode ? 'Update Service' : 'Add New Service'}</h2>
//           <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
//             <input name="name" placeholder="Service Name" value={formData.name} onChange={handleInputChange} required />
//             <input name="age" placeholder="Age" value={formData.age} onChange={handleInputChange} required />
//             <input name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleInputChange} required />
//             <input name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} required />
//             <input name="image" placeholder="Image URL" value={formData.image} onChange={handleInputChange} required />
//             <select name="category" value={formData.category} onChange={handleInputChange} required>
//               <option value="">Select Category</option>
//               <option value="Plumber">Plumber</option>
//               <option value="Electrician">Electrician</option>
//               <option value="Carpenter">Carpenter</option>
//               <option value="Mechanic">Mechanic</option>
//             </select>
//             <button type="submit">{isEditMode ? 'Update' : 'Add'}</button>
//           </form>
//         </>
//       )}
//       <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '2rem', gap: '1rem' }}>
//         {services.map((service) => (
//           <div key={service._id} style={{ border: '1px solid #ccc', padding: '1rem', width: '250px' }}>
//             <img src={service.image} alt={service.name} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
//             <h3>{service.name}</h3>
//             <p>Age: {service.age}</p>
//             <p>Phone: {service.phoneNumber}</p>
//             <p>Category: {service.category}</p>
//             <p>{service.description}</p>
//             <p>Email: {service.email}</p>
//             {role === 'service_provider' && (
//               <>
//                 <button onClick={() => handleEdit(service)}>Edit</button>
//                 <button onClick={() => handleDelete(service._id)}>Delete</button>
//               </>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default GetserviceProvider;

import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

const GetserviceProvider = () => {
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
    const endpoint =
      role === 'service_provider'
        ? 'http://localhost:8000/api/user/myservice'
        : 'http://localhost:8000/api/user/service';

    const res = await fetch(endpoint, {
      method: 'GET',
      credentials: 'include',
    });

    const data = await res.json();
    if (res.ok) setServices(data);
    else console.error(data.message);
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
  
    const url = isEditMode
      ? `http://localhost:8000/api/user/updateservice/${editId}`
      : 'http://localhost:8000/api/user/addservice';
  
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
        await fetchServices();
        setFormData({
          name: '',
          age: '',
          phoneNumber: '',
          description: '',
          image: '',
          category: '',
          email: '',
        });
        setIsEditMode(false);
        setEditId(null);
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };
  

  const handleEdit = (service) => {
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
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/api/user/deleteservice/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (res.ok) {
        await fetchServices();
      } else {
        const data = await res.json();
        console.error(data.message);
      }
    } catch (err) {
      console.error('Error deleting service:', err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <Navbar />
      {role === 'service_provider' && (
        <>
          <h2>{isEditMode ? 'Update Service' : 'Add New Service'}</h2>
          <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
            <input name="name" placeholder="Service Name" value={formData.name} onChange={handleInputChange} required />
            <input name="age" placeholder="Age" value={formData.age} onChange={handleInputChange} required />
            <input name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} required />
            <input name="image" placeholder="Image URL" value={formData.image} onChange={handleInputChange} required />
            <select name="category" value={formData.category} onChange={handleInputChange} required>
              <option value="">Select Category</option>
              <option value="Plumber">Plumber</option>
              <option value="Electrician">Electrician</option>
              <option value="Carpenter">Carpenter</option>
              <option value="Mechanic">Mechanic</option>
            </select>
            <button type="submit">{isEditMode ? 'Update' : 'Add'}</button>
          </form>
        </>
      )}
      <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '2rem', gap: '1rem' }}>
        {services.map((service) => (
          <div key={service._id} style={{ border: '1px solid #ccc', padding: '1rem', width: '250px' }}>
            <img src={service.image} alt={service.name} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
            <h3>{service.name}</h3>
            <p>Age: {service.age}</p>
            <p>Phone: {service.phoneNumber}</p>
            <p>Category: {service.category}</p>
            <p>{service.description}</p>
            <p>Email: {service.email}</p>
            {role === 'service_provider' && (
              <>
                <button onClick={() => handleEdit(service)}>Edit</button>
                <button onClick={() => handleDelete(service._id)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetserviceProvider;
