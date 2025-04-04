// import React, { useEffect, useState } from "react";
// import Cookies from "js-cookie";

// const MySaloonDashboard = () => {
//   const [saloons, setSaloons] = useState([]);
//   const [saloonData, setSaloonData] = useState({
//     name: "",
//     address: "",
//     phoneNumber: "",
//     email: "",
//     image: "",
//     availableTimings: "",
//   });
//   const [editingSaloon, setEditingSaloon] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [showAppointments, setShowAppointments] = useState({});

//   // Fetch user's saloons
//   const fetchSaloons = async () => {
//     try {
//       const res = await fetch("http://localhost:8000/api/user/mysaloon", {
//         method: "GET",
//         credentials: "include",
//       });
//       const data = await res.json();
//       if (res.ok) {
//         setSaloons(data);
//       } else {
//         console.error("Error fetching saloons:", data.message);
//       }
//     } catch (err) {
//       console.error("Failed to fetch saloons:", err);
//     }
//   };

//   useEffect(() => {
//     fetchSaloons();

//     // Retrieve phone number and email from cookies
//     const storedPhoneNumber = Cookies.get("phoneNumber") || "";
//     const storedEmail = Cookies.get("email") || "";

//     // Prefill phone number and email fields
//     setSaloonData((prevData) => ({
//       ...prevData,
//       phoneNumber: storedPhoneNumber,
//       email: storedEmail,
//     }));
//   }, []);

//   // Handle input changes
//   const handleChange = (e) => {
//     setSaloonData({ ...saloonData, [e.target.name]: e.target.value });
//   };

//   // Add or update a saloon
//   const handleSaveSaloon = async () => {
//     setLoading(true);
//     try {
//         const url = editingSaloon
//             ? `http://localhost:8000/api/user/updatesaloon/${editingSaloon._id}`
//             : "http://localhost:8000/api/user/addsaloon";
//         const method = editingSaloon ? "PUT" : "POST";

//         // Ensure availableTimings is stored as an array
//         const formattedTimings = Array.isArray(saloonData.availableTimings)
//             ? saloonData.availableTimings
//             : saloonData.availableTimings.split(",").map((time) => time.trim());

//         const updatedSaloonData = {
//             ...saloonData,
//             availableTimings: formattedTimings,  
//             phoneNumber: saloonData.phoneNumber || Cookies.get("phoneNumber") || "",  
//             email: saloonData.email || Cookies.get("email") || "",
//         };

//         const res = await fetch(url, {
//             method,
//             headers: { "Content-Type": "application/json" },
//             credentials: "include",
//             body: JSON.stringify(updatedSaloonData),
//         });

//         const data = await res.json();

//         if (res.ok) {
//             alert(`Saloon ${editingSaloon ? "updated" : "added"} successfully!`);
//             fetchSaloons();
//             setSaloonData({
//                 name: "",
//                 address: "",
//                 phoneNumber: Cookies.get("phoneNumber") || "",
//                 email: Cookies.get("email") || "",
//                 image: "",
//                 availableTimings: "",
//             });
//             setEditingSaloon(null);
//         } else {
//             alert("Error: " + (data.message || "Unknown error"));
//         }
//     } catch (err) {
//         alert("Failed to save saloon. Please try again.");
//     }
//     setLoading(false);
// };



//   // Edit a saloon
//   const handleEditSaloon = (saloon) => {
//     setEditingSaloon(saloon);
//     setSaloonData({
//         name: saloon.name,
//         address: saloon.address,
//         phoneNumber: saloon.phoneNumber || Cookies.get("phoneNumber") || "", // Preserve stored phone number
//         email: saloon.email || Cookies.get("email") || "", // Preserve stored email
//         image: saloon.image,
//         availableTimings: saloon.availableTimings || [],
//     });
// };

//   // Delete a saloon
//   const handleDeleteSaloon = async (saloonId) => {
//     if (!window.confirm("Are you sure you want to delete this saloon?")) return;
//     try {
//       const res = await fetch(`http://localhost:8000/api/user/deletesaloon/${saloonId}`, {
//         method: "DELETE",
//         credentials: "include",
//       });
//       const data = await res.json();
//       if (res.ok) {
//         alert("Saloon deleted successfully!");
//         fetchSaloons();
//       } else {
//         alert("Error deleting saloon: " + data.message);
//       }
//     } catch (err) {
//       console.error("Failed to delete saloon:", err);
//     }
//   };

//   // Toggle booked appointments visibility
//   const toggleBookedAppointments = (saloonId) => {
//     setShowAppointments((prev) => ({
//       ...prev,
//       [saloonId]: !prev[saloonId], // Toggle visibility
//     }));
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>My Saloon Dashboard</h2>

//       {/* Add / Edit Saloon Form */}
//       <div style={{ border: "1px solid #ccc", padding: "15px", marginBottom: "20px" }}>
//         <h3>{editingSaloon ? "Edit Saloon" : "Add New Saloon"}</h3>
//         <input type="text" name="name" placeholder="Saloon Name" value={saloonData.name} onChange={handleChange} />
//         <input type="text" name="address" placeholder="Address" value={saloonData.address} onChange={handleChange} />
//         <input type="text" name="image" placeholder="Image URL" value={saloonData.image} onChange={handleChange} />
//         <input type="text" name="availableTimings" placeholder="Available Timings (e.g., Mon-Fri: 9 AM - 7 PM)" value={saloonData.timings} onChange={handleChange} />
//         <button onClick={handleSaveSaloon} disabled={loading}>
//           {loading ? "Saving..." : editingSaloon ? "Update" : "Add"}
//         </button>
//       </div>

//       {/* Display Saloon List */}
//       <h3>Your Saloons</h3>
//       <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
//         {saloons.length > 0 ? (
//           saloons.map((saloon) => (
//             <div key={saloon._id} style={{ border: "1px solid #ccc", padding: "15px", width: "300px" }}>
//               <img src={saloon.image} alt={saloon.name} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
//               <h3>{saloon.name}</h3>
//               <p>Address: {saloon.address}</p>
//               <p>Phone: {saloon.phoneNumber}</p>
//               <p>Email: {saloon.email}</p>
//               <p>Available Timings: {saloon.availableTimings || "Not Set"}</p>
//               {/* Show Booked Appointments Button */}
//               <button onClick={() => toggleBookedAppointments(saloon._id)} style={{ marginTop: "10px" }}>
//                 {showAppointments[saloon._id] ? "Hide Booked Appointments" : "Show Booked Appointments"}
//               </button>

//               {/* Conditionally Render Booked Appointments */}
//               {showAppointments[saloon._id] && (
//                 <div style={{ marginTop: "10px" }}>
//                   <h4>Booked Appointments</h4>
//                   {saloon.bookedAppointments.length > 0 ? (
//                     <ul>
//                       {saloon.bookedAppointments.map((appointment, index) => (
//                         <li key={index}>
//                           <strong>{appointment.customerName}</strong> - {appointment.customerPhone} <br />
//                           <span>Date: {appointment.date} | Time: {appointment.time}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   ) : (
//                     <p>No appointments booked yet.</p>
//                   )}
//                 </div>
//               )}

//               <button onClick={() => handleEditSaloon(saloon)}>Edit</button>
//               <button onClick={() => handleDeleteSaloon(saloon._id)} style={{ backgroundColor: "red", color: "white" }}>
//                 Delete
//               </button>
//             </div>
//           ))
//         ) : (
//           <p>No saloons found. Add one to get started!</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MySaloonDashboard;
///////////////

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import SaloonModal from "./SaloonModal"; // Import the modal component

const MySaloonDashboard = () => {
  const [saloons, setSaloons] = useState([]);
  const [saloonData, setSaloonData] = useState({
    name: "",
    address: "",
    phoneNumber: "", // Will be prefilled from cookie
    email: "",       // Will be prefilled from cookie
    image: "",
    availableTimings: "", // Keep as string for input, convert on save
  });
  const [editingSaloon, setEditingSaloon] = useState(null); // Store the whole saloon object being edited or null
  const [loading, setLoading] = useState(false);
  const [showAppointments, setShowAppointments] = useState({}); // State to track visibility per saloon
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  // --- Data Fetching ---
  const fetchSaloons = async () => {
    setLoading(true); // Indicate loading started
    try {
      const res = await fetch("http://localhost:8000/api/user/mysaloon", {
        method: "GET",
        credentials: "include", // Important for sending cookies
      });
      const data = await res.json();
      if (res.ok) {
        setSaloons(data);
      } else {
        console.error("Error fetching saloons:", data.message);
        // Optionally: show an error message to the user
      }
    } catch (err) {
      console.error("Failed to fetch saloons:", err);
      // Optionally: show an error message to the user
    } finally {
       setLoading(false); // Indicate loading finished
    }
  };

  // --- Effects ---
  useEffect(() => {
    fetchSaloons(); // Fetch saloons when component mounts

    // Retrieve phone number and email from cookies
    const storedPhoneNumber = Cookies.get("phoneNumber") || "";
    const storedEmail = Cookies.get("email") || "";

    // Prefill specific fields in the form state IF they aren't already set
    // (prevents overwriting if user starts typing before cookies load fully)
    setSaloonData((prevData) => ({
      ...prevData,
      phoneNumber: prevData.phoneNumber || storedPhoneNumber,
      email: prevData.email || storedEmail,
    }));
  }, []); // Empty dependency array means this runs once on mount

  // --- Event Handlers ---

  // Handles changes in the modal's input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSaloonData((prevData) => ({
      ...prevData,
      [name]: value, // Update the specific field based on input's name attribute
    }));
  };

  // Handles saving (both adding new and updating existing)
  const handleSaveSaloon = async (saloonId = null) => {
    setLoading(true);
    try {
      const url = saloonId
        ? `http://localhost:8000/api/user/updatesaloon/${saloonId}`
        : "http://localhost:8000/api/user/addsaloon";
      const method = saloonId ? "PUT" : "POST";

      // Ensure availableTimings is stored as an array of strings if it's not empty
      let formattedTimings = [];
      if (saloonData.availableTimings && typeof saloonData.availableTimings === 'string') {
         formattedTimings = saloonData.availableTimings.split(",").map((time) => time.trim()).filter(time => time !== ""); // Split, trim, remove empty strings
      } else if (Array.isArray(saloonData.availableTimings)) {
         formattedTimings = saloonData.availableTimings.filter(time => time !== ""); // Ensure no empty strings if already array
      }


      // Use current state for phone/email, fallback to cookie if somehow empty
      const finalSaloonData = {
        ...saloonData,
        availableTimings: formattedTimings, // Send as array
        phoneNumber: saloonData.phoneNumber || Cookies.get("phoneNumber") || "",
        email: saloonData.email || Cookies.get("email") || "",
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Send cookies
        body: JSON.stringify(finalSaloonData),
      });

      const data = await res.json();

      if (res.ok) {
        alert(`Salon ${saloonId ? "updated" : "added"} successfully!`);
        fetchSaloons(); // Re-fetch the list to show changes
        resetForm(); // Close modal and clear form
      } else {
        console.error("Error saving salon:", data);
        alert("Error: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Failed to save salon:", err);
      alert("Failed to save salon. Please check console and try again.");
    } finally {
      setLoading(false);
    }
  };

  // Resets the form state and closes the modal
  const resetForm = () => {
    setEditingSaloon(null); // Clear editing state
    // Reset form, prefilling phone/email from cookies again
    setSaloonData({
      name: "",
      address: "",
      phoneNumber: Cookies.get("phoneNumber") || "",
      email: Cookies.get("email") || "",
      image: "",
      availableTimings: "",
    });
    setShowModal(false); // Hide the modal
  };

  // Prepares the modal for editing an existing saloon
  const handleEditSaloon = (saloon) => {
    setEditingSaloon(saloon); // Store the saloon being edited
    // Populate form state with the selected saloon's data
    setSaloonData({
      name: saloon.name || "",
      address: saloon.address || "",
      phoneNumber: saloon.phoneNumber || Cookies.get("phoneNumber") || "", // Fallback
      email: saloon.email || Cookies.get("email") || "", // Fallback
      image: saloon.image || "",
       // Convert array back to comma-separated string for the input field
      availableTimings: Array.isArray(saloon.availableTimings)
        ? saloon.availableTimings.join(", ")
        : saloon.availableTimings || "",
    });
    setShowModal(true); // Show the modal
  };

  // Prepares the modal for adding a new saloon
  const handleAddSaloon = () => {
    resetForm(); // Clear any previous editing state and form data
    // Ensure phone/email are prefilled from cookies for a new entry
     setSaloonData({
      name: "",
      address: "",
      phoneNumber: Cookies.get("phoneNumber") || "",
      email: Cookies.get("email") || "",
      image: "",
      availableTimings: "",
    });
    setShowModal(true); // Show the modal
  };

  // Handles deleting a saloon
  const handleDeleteSaloon = async (saloonId) => {
    if (!window.confirm("Are you sure you want to delete this salon? This action cannot be undone.")) {
        return;
    }

    setLoading(true); // Optional: Indicate loading during delete
    try {
      const res = await fetch(
        `http://localhost:8000/api/user/deletesaloon/${saloonId}`,
        {
          method: "DELETE",
          credentials: "include", // Send cookies
        }
      );
      const data = await res.json();
      if (res.ok) {
        alert("Salon deleted successfully!");
        fetchSaloons(); // Refresh the list
      } else {
         console.error("Error deleting salon:", data);
        alert("Error deleting salon: " + (data.message || "Unknown error"));
      }
    } catch (err) {
       console.error("Failed to delete salon:", err);
       alert("Failed to delete salon. Please check console and try again.");
    } finally {
        setLoading(false); // Stop loading indicator
    }
  };

  // Toggles the visibility of booked appointments for a specific saloon
  const toggleBookedAppointments = (saloonId) => {
    setShowAppointments((prev) => ({
      ...prev,
      [saloonId]: !prev[saloonId], // Toggle the boolean value for the specific ID
    }));
  };

  // --- Rendering ---
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        minHeight: "100vh",
        color: "#333",
        padding: "20px",
        position: "relative", // Needed for floating button context
        fontFamily: "'Poppins', 'Segoe UI', sans-serif",
      }}
    >
      {/* Centered Header */}
      <div style={{ textAlign: "center", marginBottom: "40px",marginTop:"50px" }}>
        <h2 style={{ fontSize: "2.2rem", fontWeight: "600", marginBottom: 0 }}>
          <span style={{ color: "#333" }}>Your</span>
          <span style={{ color: "#39CF7A" }}> Salons</span>
        </h2>
      </div>

      {/* Display Loading or Salon Cards */}
      {loading && saloons.length === 0 ? ( // Show loading indicator only if initially loading
         <div style={{ textAlign: 'center', padding: '50px', color: '#64748B' }}>Loading salons...</div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "30px",
          }}
        >
          {saloons.length > 0 ? (
            saloons.map((saloon) => (
              <div
                key={saloon._id} // Essential key prop for list rendering
                style={{
                  backgroundColor: "white",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  border: "1px solid #E2E8F0",
                  display: "flex", // Added for better structure
                  flexDirection: "column", // Stack content vertically
                }}
              >
                {/* Image Section */}
                <div style={{ height: "200px", overflow: "hidden", flexShrink: 0 }}>
                  <img
                    src={saloon.image || "https://via.placeholder.com/300x200?text=No+Image"} // Provide a fallback
                    alt={saloon.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => {
                        // More robust fallback if the provided image URL fails
                        e.target.onerror = null; // prevent infinite loops
                        e.target.src = "https://via.placeholder.com/300x200?text=Image+Error";
                    }}
                  />
                </div>

                {/* Content Section */}
                <div style={{ padding: "20px", flexGrow: 1, display: 'flex', flexDirection: 'column' }}> {/* Added flex properties */}
                  <h3 style={{ fontSize: "1.5rem", marginBottom: "10px", color: "#333", fontWeight: "600" }}>
                    {saloon.name}
                  </h3>

                  {/* Info Section */}
                  <div style={{ marginBottom: "15px", fontSize: "0.9rem", color: "#555" }}>
                     <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                        {/* SVG for Address */}
                         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "8px", flexShrink: 0 }}> <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path> <circle cx="12" cy="10" r="3"></circle> </svg>
                         <span>{saloon.address || "No address provided"}</span>
                     </div>
                     <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                         {/* SVG for Phone */}
                         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "8px", flexShrink: 0 }}> <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path> </svg>
                         <span>{saloon.phoneNumber || "No phone provided"}</span>
                     </div>
                     <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                         {/* SVG for Email */}
                         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "8px", flexShrink: 0 }}> <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path> <polyline points="22,6 12,13 2,6"></polyline> </svg>
                         <span>{saloon.email || "No email provided"}</span>
                     </div>
                     <div style={{ display: "flex", alignItems: "center" }}>
                        {/* SVG for Timings */}
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "8px", flexShrink: 0 }}><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                         <span>Timings: {Array.isArray(saloon.availableTimings) && saloon.availableTimings.length > 0 ? saloon.availableTimings.join(', ') : "Not specified"}</span>
                     </div>
                  </div>

                  {/* Action Buttons Section */}
                  <div style={{ display: "flex", gap: "10px", marginBottom: "15px", marginTop: 'auto' }}> {/* marginTop auto pushes buttons down */}
                    <button
                      onClick={() => handleEditSaloon(saloon)}
                      style={{ flex: "1", padding: "8px 12px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#39cf7a", /* Blue */ border: "none", borderRadius: "50px", cursor: "pointer", color: "white", fontFamily: "'Poppins', 'Segoe UI', sans-serif", fontWeight: "500", fontSize: '0.85rem' }}
                    >
                       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "5px" }}> <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path> <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path> </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteSaloon(saloon._id)}
                      style={{ flex: "1", padding: "8px 12px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#ef4444", /* Red */ border: "none", borderRadius: "50px", cursor: "pointer", color: "white", fontFamily: "'Poppins', 'Segoe UI', sans-serif", fontWeight: "500", fontSize: '0.85rem' }}
                    >
                       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "5px" }}> <polyline points="3 6 5 6 21 6"></polyline> <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path> </svg>
                      Delete
                    </button>
                  </div>

                  {/* Show Appointments Section (conditionally rendered) */}
                  {showAppointments[saloon._id] && (
                    <div style={{ marginTop: "15px", backgroundColor: "#F5F7FA", padding: "15px", borderRadius: "8px", border: "1px solid #E2E8F0" }}>
                      <h4 style={{ marginBottom: "10px", color: "#333", fontWeight: "600", fontSize: "1.1rem" }}>
                        <span style={{ color: "#333" }}>Booked</span>
                        <span style={{ color: "#39CF7A" }}> Appointments</span>
                      </h4>
                      {saloon.bookedAppointments && saloon.bookedAppointments.length > 0 ? (
                        <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                          {saloon.bookedAppointments.map((appointment, index) => (
                            <li key={index} style={{ marginBottom: "8px", padding: "8px", backgroundColor: "white", borderRadius: "6px", border: "1px solid #E2E8F0", fontSize: '0.85rem' }}>
                              <p style={{ fontWeight: "bold", color: "#333", margin: '0 0 4px 0' }}>{appointment.customerName}</p>
                              <p style={{ color: "#64748B", margin: '0 0 4px 0' }}>{appointment.customerPhone}</p>
                              <p style={{ color: "#64748B", margin: 0 }}> Date: {appointment.date} | Time: {appointment.time} </p>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p style={{ color: "#64748B", fontStyle: "italic", margin: 0 }}>No appointments booked yet.</p>
                      )}
                    </div>
                  )}

                  {/* Toggle Appointments Button */}
                   <button
                     onClick={() => toggleBookedAppointments(saloon._id)}
                     style={{ width: "100%", marginTop: "15px", padding: "10px 15px", backgroundColor: showAppointments[saloon._id] ? "#E2E8F0" : "#f0f9f4", color: showAppointments[saloon._id] ? "#333" : "#39CF7A", border: `1px solid ${showAppointments[saloon._id] ? "#CBD5E1" : "#d4f5de"}`, borderRadius: "50px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Poppins', 'Segoe UI', sans-serif", fontWeight: "500" }}
                   >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "8px" }}> <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect> <line x1="16" y1="2" x2="16" y2="6"></line> <line x1="8" y1="2" x2="8" y2="6"></line> <line x1="3" y1="10" x2="21" y2="10"></line> </svg>
                      {showAppointments[saloon._id] ? "Hide Appointments" : "Show Appointments"}
                   </button>
                </div>
              </div>
            ))
          ) : (
             !loading && ( // Only show "No salons found" if not loading
                <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "50px 0", backgroundColor: "#f8fafc", borderRadius: "12px", border: "1px dashed #E2E8F0", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
                   <p style={{ color: "#64748B", marginBottom: "15px", fontFamily: "'Poppins', 'Segoe UI', sans-serif" }}>
                      You haven't added any salons yet.
                   </p>
                   {/* Optional: You can add an icon here if desired */}
                   <button onClick={handleAddSaloon} style={{ padding: "10px 20px", backgroundColor: "#39CF7A", color: "white", border: "none", borderRadius: "50px", cursor: 'pointer', fontWeight: '500'}}>
                       Add Your First Salon
                   </button>
                </div>
             )
          )}
        </div>
      )}

      {/* Render Modal conditionally */}
      <SaloonModal
        showModal={showModal}
        saloonData={saloonData}
        editingSaloon={editingSaloon}
        loading={loading}
        handleChange={handleChange} // Pass the handler
        resetForm={resetForm} // Pass the handler
        handleSaveSaloon={handleSaveSaloon} // Pass the handler
      />

      {/* Floating Add Button */}
      <button
        onClick={handleAddSaloon} // Opens the modal for adding
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: "#39CF7A",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 12px rgba(57, 207, 122, 0.4)",
          border: "none",
          cursor: "pointer",
          zIndex: 1000, // Ensure it's above other content but below the modal
        }}
        aria-label="Add New Salon" // For accessibility
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="3" // Thicker stroke for visibility
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>
    </div>
  );
};

export default MySaloonDashboard;