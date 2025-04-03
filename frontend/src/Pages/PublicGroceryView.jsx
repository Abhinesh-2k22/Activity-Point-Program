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
//       const res = await fetch(
//         `http://localhost:8000/api/user/grocery/${category}`
//       );
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

//   const handleMoreInfo = (item) => {
//     alert(
//       `🏪 Shop Name: ${item.shopName}\n📍 Address: ${item.address}\n📮 Pincode: ${item.pincode}`
//     );
//   };

//   return (
//     <div style={{ padding: "1rem", maxWidth: "900px", margin: "auto" }}>
//       <h2>🛍️ Browse Grocery by Category</h2>

//       {/* Category Buttons */}
//       <div
//         style={{
//           display: "flex",
//           flexWrap: "wrap",
//           gap: "10px",
//           marginBottom: "1rem",
//         }}
//       >
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
//               <p style={{ fontSize: "0.9rem", color: "#555" }}>
//                 {item.description}
//               </p>

//               <button
//                 onClick={() => handleMoreInfo(item)}
//                 style={{
//                   marginTop: "10px",
//                   padding: "6px 12px",
//                   backgroundColor: "#2196f3",
//                   color: "#fff",
//                   border: "none",
//                   borderRadius: "4px",
//                   cursor: "pointer",
//                 }}
//               >
//                 ℹ️ More Info
//               </button>
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

// Emoji mapping for categories
const categoryEmojis = {
  "fruits&Vegetables": "🍎",
  "dairy": "🥛",
  "pantrystaples": "🍚",
  "snack": "🍿",
  "beverages": "🥤",
  "personalcare": "🧴"
};

// Formatting category names for display
const formatCategoryName = (category) => {
  return category
    .replace(/([A-Z])/g, ' $1') // Add space before capital letters
    .replace(/&/g, ' & ') // Add space around &
    .split(/(?=[A-Z])/).join(' ') // Add space before capital letters
    .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()); // Capitalize first letter
};

const PublicGroceryView = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchGroceryItems = async (category) => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:8000/api/user/grocery/${category}`
      );
      const data = await res.json();
      if (res.ok) setItems(data);
      else console.error(data.message);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
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
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div style={{
      padding: "2rem",
      maxWidth: "1200px",
      margin: "0 auto",
      backgroundColor: "#f8fdf8",
      minHeight: "100vh",
      fontFamily: "'Poppins', 'Roboto', sans-serif"
    }} className="grocery-container">
      <h1 style={{
        textAlign: "center",
        color: "#2e7d32",
        fontSize: "2.5rem",
        marginBottom: "1.5rem",
        position: "relative"
      }} className="page-title">
        <span className="title-animation">🛒</span> Grocery Marketplace
      </h1>
      
      {/* Category Buttons */}
      <div className="category-section">
        <h3 style={{
          color: "#388e3c",
          marginBottom: "1rem",
          fontWeight: "500"
        }}>Select a Category</h3>
        
        <div className="category-buttons">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
            >
              <span className="category-emoji">{categoryEmojis[cat] || '📦'}</span>
              <span className="category-name">{formatCategoryName(cat)}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Content Area */}
      <div className="content-area">
        {/* Selected Category Heading */}
        {selectedCategory && (
          <h2 className="selected-category">
            <span className="category-emoji-large">{categoryEmojis[selectedCategory] || '📦'}</span>
            {formatCategoryName(selectedCategory)}
          </h2>
        )}
        
        {/* Loading Indicator */}
        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading items...</p>
          </div>
        )}
        
        {/* Grocery Items List */}
        {!loading && items.length === 0 ? (
          <div className="empty-state">
            {selectedCategory ? (
              <p>No items available in this category yet.</p>
            ) : (
              <p>Please select a category to view groceries.</p>
            )}
          </div>
        ) : (
          <div className="items-grid">
            {items.map((item, index) => (
              <div
                key={item._id}
                className="item-card"
                style={{
                  animationDelay: `${index * 0.05}s`
                }}
              >
                <div className="item-image-container">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="item-image"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                    }}
                  />
                </div>
                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <div className="item-price-quantity">
                    <span className="item-price">₹{item.price}</span>
                    <span className="item-quantity">{item.quantity}</span>
                  </div>
                  <p className="item-description">{item.description}</p>
                  <button
                    onClick={() => handleMoreInfo(item)}
                    className="more-info-btn"
                  >
                     Store Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Modal for Item Details */}
      {isModalOpen && selectedItem && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>×</button>
            <div className="modal-header">
              <h3>{selectedItem.name}</h3>
            </div>
            <div className="modal-body">
              <div className="store-info">
                <p><span className="info-label">🏪 Shop Name:</span> {selectedItem.shopName}</p>
                <p><span className="info-label">📍 Address:</span> {selectedItem.address}</p>
                <p><span className="info-label">📮 Pincode:</span> {selectedItem.pincode}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');
          
          * {
            box-sizing: border-box;
          }
          
          .grocery-container {
            transition: all 0.3s ease;
          }
          
          .page-title {
            text-shadow: 1px 1px 3px rgba(0,0,0,0.1);
          }
          
          .title-animation {
            display: inline-block;
            animation: bounce 2s infinite;
          }
          
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          
          .category-section {
            background-color: white;
            padding: 1.5rem;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
            margin-bottom: 2rem;
          }
          
          .category-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            justify-content: center;
          }
          
          .category-btn {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 12px;
            border-radius: 12px;
            border: none;
            background-color: white;
            color: #333;
            cursor: pointer;
            transition: all 0.3s ease;
            min-width: 110px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          }
          
          .category-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          }
          
          .category-btn.active {
            background-color: #4caf50;
            color: white;
            transform: translateY(-3px);
            box-shadow: 0 4px 12px rgba(76,175,80,0.3);
          }
          
          .category-emoji {
            font-size: 1.8rem;
            margin-bottom: 8px;
          }
          
          .category-name {
            font-size: 0.9rem;
            font-weight: 500;
            text-align: center;
          }
          
          .selected-category {
            display: flex;
            align-items: center;
            color: #2e7d32;
            margin-bottom: 1.5rem;
            font-weight: 500;
            background-color: white;
            padding: 0.8rem 1.5rem;
            border-radius: 50px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
            display: inline-flex;
          }
          
          .category-emoji-large {
            font-size: 1.5rem;
            margin-right: 10px;
          }
          
          .content-area {
            background-color: white;
            padding: 1.5rem;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          }
          
          .empty-state {
            text-align: center;
            padding: 3rem 1rem;
            color: #666;
            font-size: 1.1rem;
          }
          
          .loading-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 3rem 1rem;
          }
          
          .loading-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #4caf50;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 1rem;
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          .items-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 1.5rem;
          }
          
          .item-card {
            background-color: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 3px 10px rgba(0,0,0,0.08);
            transition: all 0.3s ease;
            transform: translateY(20px);
            opacity: 0;
            animation: fadeInUp 0.5s forwards;
          }
          
          @keyframes fadeInUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .item-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.12);
          }
          
          .item-image-container {
            height: 200px;
            overflow: hidden;
            position: relative;
          }
          
          .item-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
          }
          
          .item-card:hover .item-image {
            transform: scale(1.05);
          }
          
          .item-details {
            padding: 1.2rem;
          }
          
          .item-name {
            font-size: 1.1rem;
            font-weight: 600;
            color: #333;
            margin: 0 0 0.5rem 0;
          }
          
          .item-price-quantity {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.8rem;
          }
          
          .item-price {
            font-weight: 600;
            color: #4caf50;
            font-size: 1.1rem;
          }
          
          .item-quantity {
            color: #666;
            font-size: 0.9rem;
            background-color: #f0f8f0;
            padding: 2px 8px;
            border-radius: 4px;
          }
          
          .item-description {
            font-size: 0.9rem;
            color: #666;
            margin-bottom: 1rem;
            line-height: 1.4;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          
          .more-info-btn {
            width: 100%;
            padding: 0.7rem;
            background-color: #66bb6a;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.2s ease;
            font-family: 'Poppins', sans-serif;
          }
          
          .more-info-btn:hover {
            background-color: #4caf50;
            box-shadow: 0 3px 8px rgba(76,175,80,0.3);
          }
          
          /* Modal Styles */
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: a;
            bottom: 0;
            background-color: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            animation: fadeIn 0.2s ease;
          }
          
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          .modal-content {
            background-color: white;
            border-radius: 12px;
            width: 90%;
            max-width: 500px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            position: relative;
            animation: scaleIn 0.3s ease;
          }
          
          @keyframes scaleIn {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          
          .modal-close-btn {
            position: absolute;
            top: 10px;
            right: 15px;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #666;
            transition: color 0.2s;
          }
          
          .modal-close-btn:hover {
            color: #333;
          }
          
          .modal-header {
            padding: 1.5rem 1.5rem 0.5rem;
            border-bottom: 1px solid #eee;
          }
          
          .modal-header h3 {
            margin: 0;
            color: #2e7d32;
            font-weight: 600;
          }
          
          .modal-body {
            padding: 1.5rem;
          }
          
          .store-info p {
            margin: 0.7rem 0;
            font-size: 1rem;
            line-height: 1.5;
          }
          
          .info-label {
            font-weight: 500;
            margin-right: 5px;
          }
          
          /* Responsive adjustments */
          @media (max-width: 768px) {
            .grocery-container {
              padding: 1rem;
            }
            
            .category-btn {
              min-width: 90px;
            }
            
            .items-grid {
              grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
            }
          }
          
          @media (max-width: 480px) {
            .page-title {
              font-size: 2rem;
            }
            
            .category-buttons {
              gap: 8px;
            }
            
            .category-btn {
              min-width: 80px;
              padding: 8px;
            }
            
            .category-emoji {
              font-size: 1.5rem;
            }
            
            .items-grid {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>
    </div>
  );
};

export default PublicGroceryView;


