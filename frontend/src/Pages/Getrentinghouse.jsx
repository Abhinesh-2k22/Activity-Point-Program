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

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <Navbar />
      {role === 'renting_broker' && (
        <>
          <h2>{isEditMode ? 'Update Listing' : 'Add New Listing'}</h2>
          <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
            <input name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} required />
            <input name="rentPerMonth" placeholder="Rent" value={formData.rentPerMonth} onChange={handleInputChange} required />
            <input name="advanceAmount" placeholder="Advance" value={formData.advanceAmount} onChange={handleInputChange} required />
            <input name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} required />
            <input name="address" placeholder="Address" value={formData.address} onChange={handleInputChange} required />
            <input name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleInputChange} required />
            <input name="image" placeholder="Image URL" value={formData.image} onChange={handleInputChange} />
            <button type="submit">{isEditMode ? 'Update' : 'Add'}</button>
          </form>
        </>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '2rem', gap: '1rem' }}>
        {houses.map((house) => (
          <div key={house._id} style={{ border: '1px solid #ccc', padding: '1rem', width: '250px' }}>
            <img
              src={house.image}
              alt={house.name}
              style={{ width: '100%', height: '160px', objectFit: 'cover' }}
            />
            <h3>{house.name}</h3>
            <p>{house.address}</p>
            <p>Rent: ₹{house.rentPerMonth}</p>
            <p>Advance: ₹{house.advanceAmount}</p>
            {role !== 'renting_broker' &&
            <button onClick={() => alert(`Email: ${house.email}\nPhone: ${house.phoneNumber}`)}>Contact</button> }
            
            {role === 'renting_broker' && (
              <>
                <button onClick={() => handleEdit(house)}>Edit</button>
                <button onClick={() => handleDelete(house._id)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Getrentinghouse;
