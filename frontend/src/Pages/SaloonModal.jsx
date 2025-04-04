// import React, { useState, useEffect } from "react";
// import Cookies from "js-cookie";

// const SaloonModal = ({
//     showModal,
//     saloonData,
//     editingSaloon,
//     loading,
//     handleChange,
//     handleSaveSaloon,
//     resetForm
//   }) => {
//     if (!showModal) return null;

//     return (
//       <div style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         backgroundColor: "rgba(0, 0, 0, 0.5)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         zIndex: 1001,
//         fontFamily: "'Poppins', 'Segoe UI', sans-serif",
//       }}>
//         <div style={{
//           backgroundColor: "white",
//           borderRadius: "12px",
//           padding: "30px",
//           width: "90%",
//           maxWidth: "600px",
//           maxHeight: "90vh",
//           overflow: "auto",
//           boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
//         }}>
//           <h3 style={{ 
//             marginBottom: "20px", 
//             fontSize: "1.8rem",
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             fontWeight: "600",
//             color: "#333"
//           }}>
//             <span>
//               <span style={{ color: "#333" }}>{editingSaloon ? "Edit " : "Add New "}</span>
//               <span style={{ color: "#39CF7A" }}>Salon</span>
//             </span>
            
//             <button 
//               onClick={resetForm}
//               style={{
//                 background: "none",
//                 border: "none",
//                 fontSize: "1.5rem",
//                 cursor: "pointer",
//                 color: "#888"
//               }}
//             >
//               &times;
//             </button>
//           </h3>
          
//           <div style={{ marginBottom: "15px" }}>
//             <label style={{ display: "block", marginBottom: "8px", color: "#333", fontWeight: "500" }}>
//               Salon Name
//             </label>
//             <input
//               type="text"
//               name="name"
//               placeholder="Salon Name"
//               value={saloonData.name || ""}
//               onChange={handleChange}
//               style={{ 
//                 padding: "12px", 
//                 backgroundColor: "white", 
//                 border: "1px solid #E2E8F0", 
//                 borderRadius: "8px",
//                 color: "#333",
//                 width: "100%",
//                 fontFamily: "'Poppins', 'Segoe UI', sans-serif",
//               }}
//             />
//           </div>
          
//           <div style={{ marginBottom: "15px" }}>
//             <label style={{ display: "block", marginBottom: "8px", color: "#333", fontWeight: "500" }}>
//               Address
//             </label>
//             <input
//               type="text"
//               name="address"
//               placeholder="Address"
//               value={saloonData.address || ""}
//               onChange={handleChange}
//               style={{ 
//                 padding: "12px", 
//                 backgroundColor: "white", 
//                 border: "1px solid #E2E8F0", 
//                 borderRadius: "8px",
//                 color: "#333",
//                 width: "100%",
//                 fontFamily: "'Poppins', 'Segoe UI', sans-serif",
//               }}
//             />
//           </div>
          
//           <div style={{ marginBottom: "15px" }}>
//             <label style={{ display: "block", marginBottom: "8px", color: "#333", fontWeight: "500" }}>
//               Image URL
//             </label>
//             <input
//               type="text"
//               name="image"
//               placeholder="Image URL"
//               value={saloonData.image || ""}
//               onChange={handleChange}
//               style={{ 
//                 padding: "12px", 
//                 backgroundColor: "white", 
//                 border: "1px solid #E2E8F0", 
//                 borderRadius: "8px",
//                 color: "#333",
//                 width: "100%",
//                 fontFamily: "'Poppins', 'Segoe UI', sans-serif",
//               }}
//             />
//           </div>
          
//           <div style={{ marginBottom: "25px" }}>
//             <label style={{ display: "block", marginBottom: "8px", color: "#333", fontWeight: "500" }}>
//               Available Timings
//             </label>
//             <input
//               type="text"
//               name="availableTimings"
//               placeholder="Available Timings (e.g., Mon-Fri: 9 AM - 7 PM)"
//               value={saloonData.availableTimings || ""}
//               onChange={handleChange}
//               style={{ 
//                 padding: "12px", 
//                 backgroundColor: "white", 
//                 border: "1px solid #E2E8F0", 
//                 borderRadius: "8px",
//                 color: "#333",
//                 width: "100%",
//                 fontFamily: "'Poppins', 'Segoe UI', sans-serif",
//               }}
//             />
//           </div>
          
//           <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
//             <button
//               onClick={resetForm}
//               style={{ 
//                 padding: "10px 24px", 
//                 backgroundColor: "#F5F7FA", 
//                 color: "#333", 
//                 border: "1px solid #E2E8F0", 
//                 borderRadius: "50px", 
//                 fontWeight: "500",
//                 cursor: "pointer",
//                 fontFamily: "'Poppins', 'Segoe UI', sans-serif",
//               }}
//             >
//               Cancel
//             </button>
            
//             <button
//               onClick={() => handleSaveSaloon(editingSaloon ? editingSaloon._id : null)}
//               disabled={loading}
//               style={{ 
//                 padding: "10px 24px", 
//                 backgroundColor: "#39CF7A",
//                 color: "white", 
//                 border: "none", 
//                 borderRadius: "50px", 
//                 fontWeight: "500",
//                 cursor: loading ? "not-allowed" : "pointer",
//                 opacity: loading ? 0.7 : 1,
//                 fontFamily: "'Poppins', 'Segoe UI', sans-serif",
//               }}
//             >
//               {loading ? "Saving..." : editingSaloon ? "Update" : "Add"}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   export default SaloonModal;

import React from "react";

// Define SaloonModal OUTSIDE MySaloonDashboard
// It receives all needed state and handlers as props
const SaloonModal = ({
  showModal,
  saloonData,
  editingSaloon,
  loading,
  handleChange, // Passed handler
  resetForm,      // Passed handler
  handleSaveSaloon, // Passed handler
}) => {
  // Don't render anything if the modal shouldn't be shown
  if (!showModal) {
    return null;
  }

  return (
    <div
      style={{
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
        fontFamily: "'Poppins', 'Segoe UI', sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "30px",
          width: "90%",
          maxWidth: "600px",
          maxHeight: "90vh",
          overflow: "auto",
          boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
        }}
      >
        <h3
          style={{
            marginBottom: "20px",
            fontSize: "1.8rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontWeight: "600",
            color: "#333",
          }}
        >
          <span>
            <span style={{ color: "#333" }}>
              {editingSaloon ? "Edit " : "Add New "}
            </span>
            <span style={{ color: "#39CF7A" }}>Salon</span>
          </span>

          <button
            onClick={resetForm} // Use passed handler
            style={{
              background: "none",
              border: "none",
              fontSize: "1.5rem",
              cursor: "pointer",
              color: "#888",
            }}
          >
            &times;
          </button>
        </h3>

        {/* Input for Salon Name */}
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#333",
              fontWeight: "500",
            }}
          >
            Salon Name
          </label>
          <input
            type="text"
            name="name" // Must match state key
            placeholder="Salon Name"
            value={saloonData.name} // Controlled by passed prop
            onChange={handleChange} // Use passed handler
            style={{
              padding: "12px",
              backgroundColor: "white",
              border: "1px solid #E2E8F0",
              borderRadius: "8px",
              color: "#333",
              width: "100%",
              fontFamily: "'Poppins', 'Segoe UI', sans-serif",
            }}
          />
        </div>

        {/* Input for Address */}
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#333",
              fontWeight: "500",
            }}
          >
            Address
          </label>
          <input
            type="text"
            name="address" // Must match state key
            placeholder="Address"
            value={saloonData.address} // Controlled by passed prop
            onChange={handleChange} // Use passed handler
            style={{
              padding: "12px",
              backgroundColor: "white",
              border: "1px solid #E2E8F0",
              borderRadius: "8px",
              color: "#333",
              width: "100%",
              fontFamily: "'Poppins', 'Segoe UI', sans-serif",
            }}
          />
        </div>

        {/* Input for Image URL */}
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#333",
              fontWeight: "500",
            }}
          >
            Image URL
          </label>
          <input
            type="text"
            name="image" // Must match state key
            placeholder="Image URL"
            value={saloonData.image} // Controlled by passed prop
            onChange={handleChange} // Use passed handler
            style={{
              padding: "12px",
              backgroundColor: "white",
              border: "1px solid #E2E8F0",
              borderRadius: "8px",
              color: "#333",
              width: "100%",
              fontFamily: "'Poppins', 'Segoe UI', sans-serif",
            }}
          />
        </div>

        {/* Input for Available Timings */}
        <div style={{ marginBottom: "25px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#333",
              fontWeight: "500",
            }}
          >
            Available Timings
          </label>
          <input
            type="text"
            name="availableTimings" // Must match state key
            placeholder="Available Timings (e.g., 9 AM - 7 PM, comma-separated)"
            value={saloonData.availableTimings} // Controlled by passed prop
            onChange={handleChange} // Use passed handler
            style={{
              padding: "12px",
              backgroundColor: "white",
              border: "1px solid #E2E8F0",
              borderRadius: "8px",
              color: "#333",
              width: "100%",
              fontFamily: "'Poppins', 'Segoe UI', sans-serif",
            }}
          />
        </div>

        {/* Action Buttons */}
        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
        >
          <button
            onClick={resetForm} // Use passed handler
            style={{
              padding: "10px 24px",
              backgroundColor: "#F5F7FA",
              color: "#333",
              border: "1px solid #E2E8F0",
              borderRadius: "50px",
              fontWeight: "500",
              cursor: "pointer",
              fontFamily: "'Poppins', 'Segoe UI', sans-serif",
            }}
          >
            Cancel
          </button>

          <button
            onClick={() => handleSaveSaloon(editingSaloon ? editingSaloon._id : null)} // Use passed handler
            disabled={loading}
            style={{
              padding: "10px 24px",
              backgroundColor: "#39CF7A",
              color: "white",
              border: "none",
              borderRadius: "50px",
              fontWeight: "500",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
              fontFamily: "'Poppins', 'Segoe UI', sans-serif",
            }}
          >
            {loading ? "Saving..." : editingSaloon ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaloonModal; // Export the component