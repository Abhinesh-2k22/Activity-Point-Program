// import React, { useEffect, useState } from "react";

// const PublicSaloonView = () => {
//   const [saloons, setSaloons] = useState([]);
//   const [selectedSaloon, setSelectedSaloon] = useState(null);
//   const [availableSlots, setAvailableSlots] = useState([]);
//   const [user, setUser] = useState(null);
//   const [isBooking, setIsBooking] = useState(false);
//   const [appointmentData, setAppointmentData] = useState({
//     customerName: "",
//     customerPhone: "",
//     date: new Date().toISOString().split("T")[0],
//     time: "",
//   });

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await fetch("http://localhost:8000/api/auth/cookie", {
//           method: "GET",
//           credentials: "include",
//         });
//         if (!res.ok) throw new Error("Failed to fetch user");

//         const data = await res.json();
//         setUser(data.user);
//         setAppointmentData((prev) => ({
//           ...prev,
//           customerName: data.user?.name || "",
//           customerPhone: data.user?.phone || "",
//         }));
//       } catch (err) {
//         console.error("User fetch error:", err);
//       }
//     };

//     const fetchSaloons = async () => {
//       try {
//         const res = await fetch("http://localhost:8000/api/user/saloon", {
//           method: "GET",
//           credentials: "include",
//         });
//         if (!res.ok) throw new Error("Failed to fetch saloons");

//         const data = await res.json();
//         setSaloons(data);
//       } catch (err) {
//         console.error("Saloons fetch error:", err);
//       }
//     };

//     fetchUser();
//     fetchSaloons();
//   }, []);

//   const fetchAvailableSlots = async (saloonId) => {
//     setAvailableSlots([]); // Reset slots when fetching new data
//     try {
//       const res = await fetch(`http://localhost:8000/api/user/available-slots/${saloonId}`, {
//         method: "GET",
//         credentials: "include",
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Failed to fetch slots");

//       setAvailableSlots(Array.isArray(data.availableTimings) ? data.availableTimings : []);
//     } catch (err) {
//       console.error("Slot fetch error:", err);
//       setAvailableSlots([]);
//     }
//   };

//   const handleBookAppointment = async () => {
//     if (!selectedSaloon) {
//       alert("Please select a saloon first!");
//       return;
//     }
//     if (!appointmentData.time) {
//       alert("Please select a time slot!");
//       return;
//     }
//     if (!appointmentData.customerPhone) {
//       alert("Your phone number is missing! Please update your profile.");
//       return;
//     }

//     setIsBooking(true);

//     try {
//       const res = await fetch(
//         `http://localhost:8000/api/user/book-appointment/${selectedSaloon._id}`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           credentials: "include",
//           body: JSON.stringify(appointmentData),
//         }
//       );

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Booking failed");

//       alert("Appointment booked successfully!");
//       setAppointmentData((prev) => ({ ...prev, time: "" }));
//       fetchAvailableSlots(selectedSaloon._id); // Refresh slots
//     } catch (err) {
//       alert("Error booking appointment: " + err.message);
//       console.error("Booking error:", err);
//     } finally {
//       setIsBooking(false);
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Available Saloons</h2>
//       <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
//         {saloons.map((saloon) => (
//           <div key={saloon._id} style={{ border: "1px solid #ccc", padding: "15px", width: "250px" }}>
//             <img
//               src={saloon.image}
//               alt={saloon.name}
//               style={{ width: "100%", height: "150px", objectFit: "cover" }}
//             />
//             <h3>{saloon.name}</h3>
//             <p>Address: {saloon.address}</p>
//             <p>Phone: {saloon.phoneNumber}</p>
//             <p>Email: {saloon.email}</p>
//             <button
//               onClick={() => {
//                 setSelectedSaloon(saloon);
//                 fetchAvailableSlots(saloon._id);
//               }}
//             >
//               View Slots & Book
//             </button>
//           </div>
//         ))}
//       </div>

//       {selectedSaloon && (
//         <div style={{ marginTop: "20px" }}>
//           <h3>Available Slots for {selectedSaloon.name}</h3>
//           <ul>
//             {availableSlots.length > 0 ? (
//               availableSlots.map((slot, index) => <li key={index}>{slot}</li>)
//             ) : (
//               <p>No available slots</p>
//             )}
//           </ul>

//           <h3>Book Appointment</h3>
//           <input type="text" placeholder="Your Name" value={appointmentData.customerName} disabled />
//           <input type="text" placeholder="Phone Number" value={appointmentData.customerPhone} disabled />
//           <input type="date" value={appointmentData.date} disabled />
//           <select
//             value={appointmentData.time}
//             onChange={(e) => setAppointmentData({ ...appointmentData, time: e.target.value })}
//           >
//             <option value="">Select Time Slot</option>
//             {availableSlots.map((slot, index) => (
//               <option key={index} value={slot}>
//                 {slot}
//               </option>
//             ))}
//           </select>
//           <button onClick={handleBookAppointment} disabled={isBooking}>
//             {isBooking ? "Booking..." : "Book Now"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PublicSaloonView;

import React, { useEffect, useState } from "react";

const PublicSaloonView = () => {
  const [saloons, setSaloons] = useState([]);
  const [selectedSaloon, setSelectedSaloon] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [user, setUser] = useState(null);
  const [isBooking, setIsBooking] = useState(false);
  const [appointmentData, setAppointmentData] = useState({
    customerName: "",
    customerPhone: "",
    date: new Date().toISOString().split("T")[0],
    time: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/auth/cookie", {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch user");

        const data = await res.json();
        setUser(data.user);
        setAppointmentData((prev) => ({
          ...prev,
          customerName: data.user?.name || "",
          customerPhone: data.user?.phone || "",
        }));
      } catch (err) {
        console.error("User fetch error:", err);
      }
    };

    const fetchSaloons = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/user/saloon", {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch saloons");

        const data = await res.json();
        setSaloons(data);
      } catch (err) {
        console.error("Saloons fetch error:", err);
      }
    };

    fetchUser();
    fetchSaloons();
  }, []);

  const fetchAvailableSlots = async (saloonId) => {
    setAvailableSlots([]); // Reset slots when fetching new data
    try {
      const res = await fetch(`http://localhost:8000/api/user/available-slots/${saloonId}`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch slots");

      setAvailableSlots(Array.isArray(data.availableTimings) ? data.availableTimings : []);
    } catch (err) {
      console.error("Slot fetch error:", err);
      setAvailableSlots([]);
    }
  };

  const handleBookAppointment = async () => {
    if (!selectedSaloon) {
      alert("Please select a saloon first!");
      return;
    }
    if (!appointmentData.time) {
      alert("Please select a time slot!");
      return;
    }
    if (!appointmentData.customerPhone) {
      alert("Your phone number is missing! Please update your profile.");
      return;
    }

    setIsBooking(true);

    try {
      const res = await fetch(
        `http://localhost:8000/api/user/book-appointment/${selectedSaloon._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(appointmentData),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Booking failed");

      alert("Appointment booked successfully!");
      setAppointmentData((prev) => ({ ...prev, time: "" }));
      fetchAvailableSlots(selectedSaloon._id); // Refresh slots
    } catch (err) {
      alert("Error booking appointment: " + err.message);
      console.error("Booking error:", err);
    } finally {
      setIsBooking(false);
    }
  };

  // Booking Modal Component
  const BookingModal = () => {
    if (!selectedSaloon) return null;

    return (
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1001,
      }}>
        <div style={{
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "30px",
          width: "90%",
          maxWidth: "600px",
          maxHeight: "90vh",
          overflow: "auto",
          boxShadow: "0 5px 15px rgba(0,0,0,0.3)"
        }}>
          <h3 style={{ 
            color: "#333333", 
            marginBottom: "20px", 
            fontSize: "1.8rem",
            fontWeight: "bold",
            fontFamily: "'Segoe UI', Arial, sans-serif",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <span style={{ position: "relative" }}>
              <span style={{ color: "#333333" }}>Book an Appointment at </span>
              <span style={{ color: "#2ED573" }}>{selectedSaloon.name}</span>
            </span>
            
            <button 
              onClick={() => setSelectedSaloon(null)}
              style={{
                background: "none",
                border: "none",
                fontSize: "1.5rem",
                cursor: "pointer",
                color: "#888"
              }}
            >
              &times;
            </button>
          </h3>
          
          <div style={{ marginBottom: "25px" }}>
            <h4 style={{ 
              fontSize: "1.2rem", 
              marginBottom: "15px", 
              color: "#333", 
              fontWeight: "bold", 
              fontFamily: "'Segoe UI', Arial, sans-serif" 
            }}>
              Available Time Slots
            </h4>
            
            {availableSlots.length > 0 ? (
              <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginBottom: "20px"
              }}>
                {availableSlots.map((slot, index) => (
                  <button
                    key={index}
                    onClick={() => setAppointmentData({ ...appointmentData, time: slot })}
                    style={{ 
                      padding: "8px 16px", 
                      backgroundColor: appointmentData.time === slot ? "#2ED573" : "#F5F7FA", 
                      color: appointmentData.time === slot ? "white" : "#333", 
                      border: appointmentData.time === slot ? "none" : "1px solid #E2E8F0", 
                      borderRadius: "5px", 
                      cursor: "pointer",
                      fontFamily: "'Segoe UI', Arial, sans-serif",
                      fontSize: "0.95rem"
                    }}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            ) : (
              <p style={{ 
                color: "#64748B", 
                fontStyle: "italic", 
                fontFamily: "'Segoe UI', Arial, sans-serif",
                marginBottom: "20px"
              }}>
                No available slots for today
              </p>
            )}
          </div>
          
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px", color: "#333", fontWeight: "500", fontFamily: "'Segoe UI', Arial, sans-serif" }}>
              Your Name
            </label>
            <input
              type="text"
              placeholder="Your Name"
              value={appointmentData.customerName}
              disabled
              style={{ 
                padding: "12px", 
                backgroundColor: "#F5F7FA", 
                border: "1px solid #E2E8F0", 
                borderRadius: "5px",
                color: "#64748B",
                width: "100%",
                fontFamily: "'Segoe UI', Arial, sans-serif",
                fontSize: "1rem"
              }}
            />
          </div>
          
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px", color: "#333", fontWeight: "500", fontFamily: "'Segoe UI', Arial, sans-serif" }}>
              Phone Number
            </label>
            <input
              type="text"
              placeholder="Phone Number"
              value={appointmentData.customerPhone}
              disabled
              style={{ 
                padding: "12px", 
                backgroundColor: "#F5F7FA", 
                border: "1px solid #E2E8F0", 
                borderRadius: "5px",
                color: "#64748B",
                width: "100%",
                fontFamily: "'Segoe UI', Arial, sans-serif",
                fontSize: "1rem"
              }}
            />
          </div>
          
          <div style={{ marginBottom: "25px" }}>
            <label style={{ display: "block", marginBottom: "5px", color: "#333", fontWeight: "500", fontFamily: "'Segoe UI', Arial, sans-serif" }}>
              Date
            </label>
            <input
              type="date"
              value={appointmentData.date}
              disabled
              style={{ 
                padding: "12px", 
                backgroundColor: "#F5F7FA", 
                border: "1px solid #E2E8F0", 
                borderRadius: "5px",
                color: "#64748B",
                width: "100%",
                fontFamily: "'Segoe UI', Arial, sans-serif",
                fontSize: "1rem"
              }}
            />
          </div>
          
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" }}>
            <button
              onClick={() => setSelectedSaloon(null)}
              style={{ 
                padding: "12px 24px", 
                backgroundColor: "#F5F7FA", 
                color: "#333", 
                border: "1px solid #E2E8F0", 
                borderRadius: "5px", 
                fontWeight: "bold",
                cursor: "pointer",
                fontFamily: "'Segoe UI', Arial, sans-serif",
                fontSize: "1rem"
              }}
            >
              Cancel
            </button>
            
            <button
              onClick={handleBookAppointment}
              disabled={isBooking || !appointmentData.time}
              style={{ 
                padding: "12px 24px", 
                backgroundColor: "#2ED573",
                color: "white", 
                border: "none", 
                borderRadius: "5px", 
                fontWeight: "bold",
                cursor: (isBooking || !appointmentData.time) ? "not-allowed" : "pointer",
                opacity: (isBooking || !appointmentData.time) ? 0.7 : 1,
                fontFamily: "'Segoe UI', Arial, sans-serif",
                fontSize: "1rem"
              }}
            >
              {isBooking ? "Booking..." : "Book Now"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ 
      backgroundColor: "white", 
      minHeight: "100vh",
      color: "#333",
      padding: "20px",
      position: "relative",
      fontFamily: "'Segoe UI', Arial, sans-serif"
    }}>
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        marginBottom: "40px",
        marginTop: "50px" 
      }}>
        <h2 style={{ 
          fontSize: "2.5rem", 
          color: "#333333",
          fontWeight: "bold",
          fontFamily: "'Segoe UI', Arial, sans-serif",
          marginRight: "5px"
        }}>Available <span style={{ color: "#2ED573" }}>Salons</span></h2>
      </div>

      {/* Display Salon Cards */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "30px"
      }}>
        {saloons.length > 0 ? (
          saloons.map((saloon) => (
            <div key={saloon._id} style={{ 
              backgroundColor: "white", 
              borderRadius: "10px", 
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              border: "1px solid #E2E8F0"
            }}>
              <div style={{ height: "200px", overflow: "hidden" }}>
                <img
                  src={saloon.image}
                  alt={saloon.name}
                  style={{ 
                    width: "100%", 
                    height: "100%", 
                    objectFit: "cover"
                  }}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300x200?text=Salon";
                  }}
                />
              </div>
              <div style={{ padding: "20px" }}>
                <h3 style={{ fontSize: "1.5rem", marginBottom: "15px", color: "#333", fontWeight: "bold", fontFamily: "'Segoe UI', Arial, sans-serif" }}>{saloon.name}</h3>
                
                <div style={{ marginBottom: "15px", fontFamily: "'Segoe UI', Arial, sans-serif" }}>
                  <p style={{ 
                    display: "flex",
                    alignItems: "center",
                    fontSize: "0.95rem",
                    color: "#64748B",
                    marginBottom: "8px"
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "8px" }}>
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    {saloon.address}
                  </p>
                  
                  <p style={{ 
                    display: "flex",
                    alignItems: "center",
                    fontSize: "0.95rem",
                    color: "#64748B",
                    marginBottom: "8px"
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "8px" }}>
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    {saloon.phoneNumber}
                  </p>
                  
                  <p style={{ 
                    display: "flex",
                    alignItems: "center",
                    fontSize: "0.95rem",
                    color: "#64748B",
                    marginBottom: "15px"
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "8px" }}>
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    {saloon.email}
                  </p>
                </div>
                
                <button
                  onClick={() => {
                    setSelectedSaloon(saloon);
                    fetchAvailableSlots(saloon._id);
                  }}
                  style={{ 
                    width: "100%",
                    padding: "12px 0",
                    backgroundColor: "#2ED573",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    fontFamily: "'Segoe UI', Arial, sans-serif",
                    fontSize: "1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "8px" }}>
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  View Slots & Book
                </button>
              </div>
            </div>
          ))
        ) : (
          <div style={{ 
            gridColumn: "1 / -1", 
            textAlign: "center", 
            padding: "50px 0", 
            backgroundColor: "white", 
            borderRadius: "10px",
            border: "1px solid #E2E8F0",
            boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
            fontFamily: "'Segoe UI', Arial, sans-serif"
          }}>
            <p style={{ color: "#64748B", marginBottom: "20px", fontSize: "1.1rem" }}>No salons available at the moment. Please check back later.</p>
            <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#2ED573" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01"></path>
            </svg>
          </div>
        )}
      </div>

      {/* Render Booking Modal */}
      <BookingModal />
    </div>
  );
};

export default PublicSaloonView;