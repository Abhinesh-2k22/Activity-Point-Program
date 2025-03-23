// import React, { useEffect, useState } from "react";

// const categories = [
//   "fruits&Vegetables",
//   "dairy",
//   "pantrystaples",
//   "snack",
//   "beverages",
//   "personalcare",
// ];

// const PublicGroceryView = () => {
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [items, setItems] = useState([]);

//   const fetchGroceryItems = async (category) => {
//     try {
//       const res = await fetch(`http://localhost:8000/api/user/grocery/${category}`);
//       const data = await res.json();
//       if (res.ok) setItems(data);
//       else console.error(data.message);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     if (selectedCategory) {
//       fetchGroceryItems(selectedCategory);
//     } else {
//       setItems([]);
//     }
//   }, [selectedCategory]);

//   return (
//     <div style={{ padding: "1rem", maxWidth: "900px", margin: "auto" }}>
//       <h2>🛍️ Browse Grocery by Category</h2>

//       {/* Category Buttons */}
//       <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "1rem" }}>
//         {categories.map((cat) => (
//           <button
//             key={cat}
//             onClick={() => setSelectedCategory(cat)}
//             style={{
//               padding: "8px 16px",
//               borderRadius: "20px",
//               border: "1px solid #ccc",
//               background: selectedCategory === cat ? "#4caf50" : "#f0f0f0",
//               color: selectedCategory === cat ? "#fff" : "#333",
//               cursor: "pointer",
//             }}
//           >
//             {cat}
//           </button>
//         ))}
//       </div>

//       {/* Selected Category Heading */}
//       {selectedCategory && <h3>📂 Category: {selectedCategory}</h3>}

//       {/* Grocery Items List */}
//       {items.length === 0 ? (
//         selectedCategory ? (
//           <p>No items available in this category.</p>
//         ) : (
//           <p>Please select a category to view groceries.</p>
//         )
//       ) : (
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//             gap: "1rem",
//           }}
//         >
//           {items.map((item) => (
//             <div
//               key={item._id}
//               style={{
//                 border: "1px solid #ccc",
//                 borderRadius: "8px",
//                 padding: "10px",
//                 boxShadow: "1px 1px 5px rgba(0,0,0,0.1)",
//               }}
//             >
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 style={{
//                   width: "100%",
//                   height: "180px",
//                   objectFit: "cover",
//                   borderRadius: "6px",
//                 }}
//               />
//               <h4>{item.name}</h4>
//               <p>₹{item.price} • {item.quantity}</p>
//               <p style={{ fontSize: "0.9rem", color: "#555" }}>{item.description}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PublicGroceryView;

import React, { useEffect, useState } from "react";

const categories = [
  "fruits&Vegetables",
  "dairy",
  "pantrystaples",
  "snack",
  "beverages",
  "personalcare",
];

const PublicGroceryView = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [items, setItems] = useState([]);

  const fetchGroceryItems = async (category) => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/user/grocery/${category}`
      );
      const data = await res.json();
      if (res.ok) setItems(data);
      else console.error(data.message);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      fetchGroceryItems(selectedCategory);
    } else {
      setItems([]);
    }
  }, [selectedCategory]);

  const handleMoreInfo = (item) => {
    alert(
      `🏪 Shop Name: ${item.shopName}\n📍 Address: ${item.address}\n📮 Pincode: ${item.pincode}`
    );
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "900px", margin: "auto" }}>
      <h2>🛍️ Browse Grocery by Category</h2>

      {/* Category Buttons */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "1rem",
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: "8px 16px",
              borderRadius: "20px",
              border: "1px solid #ccc",
              background: selectedCategory === cat ? "#4caf50" : "#f0f0f0",
              color: selectedCategory === cat ? "#fff" : "#333",
              cursor: "pointer",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Selected Category Heading */}
      {selectedCategory && <h3>📂 Category: {selectedCategory}</h3>}

      {/* Grocery Items List */}
      {items.length === 0 ? (
        selectedCategory ? (
          <p>No items available in this category.</p>
        ) : (
          <p>Please select a category to view groceries.</p>
        )
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1rem",
          }}
        >
          {items.map((item) => (
            <div
              key={item._id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
                boxShadow: "1px 1px 5px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "6px",
                }}
              />
              <h4>{item.name}</h4>
              <p>₹{item.price} • {item.quantity}</p>
              <p style={{ fontSize: "0.9rem", color: "#555" }}>
                {item.description}
              </p>

              <button
                onClick={() => handleMoreInfo(item)}
                style={{
                  marginTop: "10px",
                  padding: "6px 12px",
                  backgroundColor: "#2196f3",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                ℹ️ More Info
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PublicGroceryView;
