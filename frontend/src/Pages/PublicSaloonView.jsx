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

  return (
    <div style={{ padding: "20px" }}>
      <h2>Available Saloons</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {saloons.map((saloon) => (
          <div key={saloon._id} style={{ border: "1px solid #ccc", padding: "15px", width: "250px" }}>
            <img
              src={saloon.image}
              alt={saloon.name}
              style={{ width: "100%", height: "150px", objectFit: "cover" }}
            />
            <h3>{saloon.name}</h3>
            <p>Address: {saloon.address}</p>
            <p>Phone: {saloon.phoneNumber}</p>
            <p>Email: {saloon.email}</p>
            <button
              onClick={() => {
                setSelectedSaloon(saloon);
                fetchAvailableSlots(saloon._id);
              }}
            >
              View Slots & Book
            </button>
          </div>
        ))}
      </div>

      {selectedSaloon && (
        <div style={{ marginTop: "20px" }}>
          <h3>Available Slots for {selectedSaloon.name}</h3>
          <ul>
            {availableSlots.length > 0 ? (
              availableSlots.map((slot, index) => <li key={index}>{slot}</li>)
            ) : (
              <p>No available slots</p>
            )}
          </ul>

          <h3>Book Appointment</h3>
          <input type="text" placeholder="Your Name" value={appointmentData.customerName} disabled />
          <input type="text" placeholder="Phone Number" value={appointmentData.customerPhone} disabled />
          <input type="date" value={appointmentData.date} disabled />
          <select
            value={appointmentData.time}
            onChange={(e) => setAppointmentData({ ...appointmentData, time: e.target.value })}
          >
            <option value="">Select Time Slot</option>
            {availableSlots.map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          <button onClick={handleBookAppointment} disabled={isBooking}>
            {isBooking ? "Booking..." : "Book Now"}
          </button>
        </div>
      )}
    </div>
  );
};

export default PublicSaloonView;
