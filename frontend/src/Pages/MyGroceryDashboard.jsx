// import React, { useEffect, useState } from "react";

// const MyGroceryDashboard = () => {
//   const [items, setItems] = useState([]);
//   const [form, setForm] = useState({
//     name: "",
//     quantity: "",
//     price: "",
//     category: "",
//     description: "",
//     image: "",
//   });
//   const [editingId, setEditingId] = useState(null);

//   const categories = [
//     "Fruits & Vegetables",
//     "Dairy",
//     "Pantry Staples",
//     "Snacks",
//     "Beverages",
//     "Personal Care",
//   ];

//   const fetchMyGrocery = async () => {
//     try {
//       const res = await fetch("http://localhost:8000/api/user/mygrocery", {
//         credentials: "include",
//       });
//       const data = await res.json();
//       if (res.ok) setItems(data);
//       else alert(data.message);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchMyGrocery();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const url = editingId
//       ? `http://localhost:8000/api/user/updategrocery/${editingId}`
//       : `http://localhost:8000/api/user/addgrocery`;
//     const method = editingId ? "PUT" : "POST";

//     try {
//       const res = await fetch(url, {
//         method,
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         alert(editingId ? "Updated!" : "Added!");
//         setForm({
//           name: "",
//           quantity: "",
//           price: "",
//           category: "",
//           description: "",
//           image: "",
//         });
//         setEditingId(null);
//         fetchMyGrocery();
//       } else {
//         alert(data.message || "Error");
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div style={{ background: "#f2fdf5", minHeight: "100vh", padding: "2rem" }}>
//       <div style={{ textAlign: "center", marginBottom: "1rem" }}>
//         <h1 style={{ fontFamily: "sans-serif", fontSize: "2rem", color: "#222" }}>
//           🛒 Pantry Palace
//         </h1>
//         <p style={{ color: "#555" }}>Manage your grocery items easily and efficiently</p>
//       </div>

//       <div
//         style={{
//           maxWidth: "700px",
//           background: "#fff",
//           padding: "2rem",
//           borderRadius: "10px",
//           margin: "auto",
//           boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
//         }}
//       >
//         <h2 style={{ fontSize: "1.5rem", color: "#222", marginBottom: "1rem" }}>
//           {editingId ? "✏️ Edit Grocery Item" : "➕ Add New Grocery Item"}
//         </h2>

//         <form
//           onSubmit={handleSubmit}
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             gap: "12px",
//           }}
//         >
//           <input
//             type="text"
//             name="name"
//             placeholder="e.g. Organic Apples"
//             value={form.name}
//             onChange={handleChange}
//             required
//             style={inputStyle}
//           />
//           <div style={{ display: "flex", gap: "10px" }}>
//             <input
//               type="text"
//               name="quantity"
//               placeholder="e.g. 1kg, 500g, 2 pcs"
//               value={form.quantity}
//               onChange={handleChange}
//               required
//               style={{ ...inputStyle, flex: 1 }}
//             />
//             <select
//               name="category"
//               value={form.category}
//               onChange={handleChange}
//               required
//               style={{ ...inputStyle, flex: 1 }}
//             >
//               <option value="">Select a category</option>
//               {categories.map((cat) => (
//                 <option key={cat} value={cat}>
//                   {cat}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <input
//             type="number"
//             name="price"
//             placeholder="e.g. 99.99"
//             value={form.price}
//             onChange={handleChange}
//             required
//             style={inputStyle}
//           />
//           <textarea
//             name="description"
//             placeholder="Add some details about this item..."
//             value={form.description}
//             onChange={handleChange}
//             required
//             style={{ ...inputStyle, height: "80px" }}
//           />
//           <input
//             type="text"
//             name="image"
//             placeholder="https://example.com/image.jpg"
//             value={form.image}
//             onChange={handleChange}
//             required
//             style={inputStyle}
//           />
//           <button
//             type="submit"
//             style={{
//               background: "#000",
//               color: "#fff",
//               padding: "12px",
//               fontSize: "1rem",
//               border: "none",
//               borderRadius: "6px",
//               cursor: "pointer",
//             }}
//           >
//             {editingId ? "✅ Update Item" : "➕ Add Item"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// // Input styles
// const inputStyle = {
//   padding: "10px",
//   fontSize: "1rem",
//   border: "1px solid #ccc",
//   borderRadius: "6px",
//   width: "100%",
// };

// export default MyGroceryDashboard;


import React, { useEffect, useState } from "react";

const MyGroceryDashboard = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    quantity: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });
  const [editingId, setEditingId] = useState(null); // null means add mode

  const categories = [
     "fruits&Vegetables",
    "dairy",
    "pantrystaples",
    "snack",
    "beverages",
    "personalcare",
  ];

  const fetchMyGrocery = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/user/mygrocery", {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) setItems(data);
      else alert(data.message);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMyGrocery();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editingId
      ? `http://localhost:8000/api/user/updategrocery/${editingId}`
      : `http://localhost:8000/api/user/addgrocery`;
    const method = editingId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        alert(editingId ? "Updated!" : "Added!");
        setForm({
          name: "",
          quantity: "",
          price: "",
          category: "",
          description: "",
          image: "",
        });
        setEditingId(null);
        fetchMyGrocery();
      } else {
        alert(data.message || "Error");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setForm({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      category: item.category,
      description: item.description,
      image: item.image,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (!confirm) return;
    try {
      const res = await fetch(
        `http://localhost:8000/api/user/deletegrocery/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (res.ok) {
        alert("Deleted!");
        fetchMyGrocery();
      } else {
        alert(data.message || "Error deleting");
      }
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div style={{ backgroundColor: "#f0fdf4", minHeight: "100vh", padding: "2rem" }}>
      <div style={{ maxWidth: "900px", margin: "3rem auto", textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#1f2937" }}>
          🛒 Pantry Palace
        </h1>
        <p style={{ color: "#4b5563" }}>Manage your grocery items easily and efficiently</p>
      </div>

      <div
        style={{
          backgroundColor: "#ffffff",
          maxWidth: "900px",
          margin: "2rem auto",
          padding: "3rem",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
          {editingId ? "Edit Grocery Item" : " Add New Grocery Item"}
        </h2>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={{ fontWeight: "bold", color: "#1f2937" }}>Item Name</label>
              <input
                type="text"
                name="name"
                placeholder="e.g. Organic Apples"
                value={form.name}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>
            <div style={{padding: "0 0 0 1rem"}}>
              <label style={{ fontWeight: "bold", color: "#1f2937"}}>Quantity</label>
              <input
                type="text"
                name="quantity"
                placeholder="e.g. 1kg, 500g, 2 pcs"
                value={form.quantity}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ fontWeight: "bold", color: "#1f2937" }}>Price (₹)</label>
              <input
                type="number"
                name="price"
                placeholder="e.g. 99.99"
                value={form.price}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>
            <div style={{padding: "0 0 0 1rem"}}>
              <label style={{ fontWeight: "bold", color: "#1f2937" }}>Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                style={inputStyle}
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label style={{ fontWeight: "bold", color: "#1f2937" }}>Description</label>
            <textarea
              name="description"
              placeholder="Add some details about this item..."
              value={form.description}
              onChange={handleChange}
              required
              style={{ ...inputStyle, height: "80px" }}
            />
          </div>

          <div>
            <label style={{ fontWeight: "bold", color: "#1f2937" }}>Image URL</label>
            <input
              type="text"
              name="image"
              placeholder="https://example.com/image.jpg"
              value={form.image}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: "#000000",
              color: "#ffffff",
              padding: "0.75rem",
              borderRadius: "6px",
              fontWeight: "bold",
              cursor: "pointer",
              border: "none",
            }}
          >
            {editingId ? "Update Grocery" : "Add Item"}
          </button>
        </form>
      </div>

          {/* {/* Grocery Items Grid */}
          <div style={gridContainer}>
        {items.map((item) => (
          <div key={item._id} style={cardStyle}>
            <img src={item.image} alt={item.name} style={imageStyle} />
            <div style={{ padding: "1rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{item.name}</h3>
              <p style={{ color: "#4b5563" }}>{item.description}</p>
              <p style={{ fontWeight: "bold", color: "#1f2937" }}>₹{item.price}</p>
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button onClick={() => handleEdit(item)} style={editButtonStyle}>
                  Edit
                </button>
                <button onClick={() => handleDelete(item._id)} style={deleteButtonStyle}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "0.5rem",
  border: "1px solid #d1d5db",
  borderRadius: "6px",
  outline: "none",
};
const buttonStyle = {
  backgroundColor: "#000000",
  color: "#ffffff",
  padding: "0.75rem",
  borderRadius: "6px",
  fontWeight: "bold",
  cursor: "pointer",
  border: "none",
};

const gridContainer = {
  marginLeft: "1rem",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  gap: "1.5rem",
  padding: "2rem",
};

const cardStyle = {
  backgroundColor: "#fff",
  borderRadius: "1.5rem",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  overflow: "hidden",
  transition: "transform 0.3s",
};

const imageStyle = {
  width: "100%",
  height: "150px",
  objectFit: "cover",
};

const editButtonStyle = { ...buttonStyle, backgroundColor: "#4CAF50" };
const deleteButtonStyle = { ...buttonStyle, backgroundColor: "#E53935" };
export default MyGroceryDashboard;





