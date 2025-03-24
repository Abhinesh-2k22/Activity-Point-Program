import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const MySaloonDashboard = () => {
  const [saloons, setSaloons] = useState([]);
  const [saloonData, setSaloonData] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    email: "",
    image: "",
    availableTimings: "",
  });
  const [editingSaloon, setEditingSaloon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAppointments, setShowAppointments] = useState({});

  // Fetch user's saloons
  const fetchSaloons = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/user/mysaloon", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setSaloons(data);
      } else {
        console.error("Error fetching saloons:", data.message);
      }
    } catch (err) {
      console.error("Failed to fetch saloons:", err);
    }
  };

  useEffect(() => {
    fetchSaloons();

    // Retrieve phone number and email from cookies
    const storedPhoneNumber = Cookies.get("phoneNumber") || "";
    const storedEmail = Cookies.get("email") || "";

    // Prefill phone number and email fields
    setSaloonData((prevData) => ({
      ...prevData,
      phoneNumber: storedPhoneNumber,
      email: storedEmail,
    }));
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setSaloonData({ ...saloonData, [e.target.name]: e.target.value });
  };

  // Add or update a saloon
  const handleSaveSaloon = async () => {
    setLoading(true);
    try {
        const url = editingSaloon
            ? `http://localhost:8000/api/user/updatesaloon/${editingSaloon._id}`
            : "http://localhost:8000/api/user/addsaloon";
        const method = editingSaloon ? "PUT" : "POST";

        // Ensure availableTimings is stored as an array
        const formattedTimings = Array.isArray(saloonData.availableTimings)
            ? saloonData.availableTimings
            : saloonData.availableTimings.split(",").map((time) => time.trim());

        const updatedSaloonData = {
            ...saloonData,
            availableTimings: formattedTimings,  
            phoneNumber: saloonData.phoneNumber || Cookies.get("phoneNumber") || "",  
            email: saloonData.email || Cookies.get("email") || "",
        };

        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(updatedSaloonData),
        });

        const data = await res.json();

        if (res.ok) {
            alert(`Saloon ${editingSaloon ? "updated" : "added"} successfully!`);
            fetchSaloons();
            setSaloonData({
                name: "",
                address: "",
                phoneNumber: Cookies.get("phoneNumber") || "",
                email: Cookies.get("email") || "",
                image: "",
                availableTimings: "",
            });
            setEditingSaloon(null);
        } else {
            alert("Error: " + (data.message || "Unknown error"));
        }
    } catch (err) {
        alert("Failed to save saloon. Please try again.");
    }
    setLoading(false);
};



  // Edit a saloon
  const handleEditSaloon = (saloon) => {
    setEditingSaloon(saloon);
    setSaloonData({
        name: saloon.name,
        address: saloon.address,
        phoneNumber: saloon.phoneNumber || Cookies.get("phoneNumber") || "", // Preserve stored phone number
        email: saloon.email || Cookies.get("email") || "", // Preserve stored email
        image: saloon.image,
        availableTimings: saloon.availableTimings || [],
    });
};

  // Delete a saloon
  const handleDeleteSaloon = async (saloonId) => {
    if (!window.confirm("Are you sure you want to delete this saloon?")) return;
    try {
      const res = await fetch(`http://localhost:8000/api/user/deletesaloon/${saloonId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        alert("Saloon deleted successfully!");
        fetchSaloons();
      } else {
        alert("Error deleting saloon: " + data.message);
      }
    } catch (err) {
      console.error("Failed to delete saloon:", err);
    }
  };

  // Toggle booked appointments visibility
  const toggleBookedAppointments = (saloonId) => {
    setShowAppointments((prev) => ({
      ...prev,
      [saloonId]: !prev[saloonId], // Toggle visibility
    }));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Saloon Dashboard</h2>

      {/* Add / Edit Saloon Form */}
      <div style={{ border: "1px solid #ccc", padding: "15px", marginBottom: "20px" }}>
        <h3>{editingSaloon ? "Edit Saloon" : "Add New Saloon"}</h3>
        <input type="text" name="name" placeholder="Saloon Name" value={saloonData.name} onChange={handleChange} />
        <input type="text" name="address" placeholder="Address" value={saloonData.address} onChange={handleChange} />
        <input type="text" name="image" placeholder="Image URL" value={saloonData.image} onChange={handleChange} />
        <input type="text" name="availableTimings" placeholder="Available Timings (e.g., Mon-Fri: 9 AM - 7 PM)" value={saloonData.timings} onChange={handleChange} />
        <button onClick={handleSaveSaloon} disabled={loading}>
          {loading ? "Saving..." : editingSaloon ? "Update" : "Add"}
        </button>
      </div>

      {/* Display Saloon List */}
      <h3>Your Saloons</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {saloons.length > 0 ? (
          saloons.map((saloon) => (
            <div key={saloon._id} style={{ border: "1px solid #ccc", padding: "15px", width: "300px" }}>
              <img src={saloon.image} alt={saloon.name} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
              <h3>{saloon.name}</h3>
              <p>Address: {saloon.address}</p>
              <p>Phone: {saloon.phoneNumber}</p>
              <p>Email: {saloon.email}</p>
              <p>Available Timings: {saloon.availableTimings || "Not Set"}</p>
              {/* Show Booked Appointments Button */}
              <button onClick={() => toggleBookedAppointments(saloon._id)} style={{ marginTop: "10px" }}>
                {showAppointments[saloon._id] ? "Hide Booked Appointments" : "Show Booked Appointments"}
              </button>

              {/* Conditionally Render Booked Appointments */}
              {showAppointments[saloon._id] && (
                <div style={{ marginTop: "10px" }}>
                  <h4>Booked Appointments</h4>
                  {saloon.bookedAppointments.length > 0 ? (
                    <ul>
                      {saloon.bookedAppointments.map((appointment, index) => (
                        <li key={index}>
                          <strong>{appointment.customerName}</strong> - {appointment.customerPhone} <br />
                          <span>Date: {appointment.date} | Time: {appointment.time}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No appointments booked yet.</p>
                  )}
                </div>
              )}

              <button onClick={() => handleEditSaloon(saloon)}>Edit</button>
              <button onClick={() => handleDeleteSaloon(saloon._id)} style={{ backgroundColor: "red", color: "white" }}>
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No saloons found. Add one to get started!</p>
        )}
      </div>
    </div>
  );
};

export default MySaloonDashboard;
