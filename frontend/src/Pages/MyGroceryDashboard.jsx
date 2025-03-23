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
    <div style={{ padding: "1rem", maxWidth: "900px", margin: "auto" }}>
      <h2>{editingId ? "✏️ Edit Grocery" : "📦 Add Grocery Item"}</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginBottom: "2rem",
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Item name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="quantity"
          placeholder="Quantity (e.g. 1kg)"
          value={form.quantity}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Category --</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Paste Image URL"
          value={form.image}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {editingId ? "✅ Update Grocery" : "➕ Add Grocery"}
        </button>
      </form>

      <h3>🧾 My Grocery Items</h3>
      {items.length === 0 ? (
        <p>No groceries added yet.</p>
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
              <h4 style={{ margin: "10px 0 5px" }}>{item.name}</h4>
              <p>
                {item.quantity} | ₹{item.price}
              </p>
              <p style={{ fontSize: "0.85rem", color: "#555" }}>
                {item.category}
              </p>
              <p style={{ fontSize: "0.85rem" }}>{item.description}</p>
              <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                <button onClick={() => handleEdit(item)}>✏️ Edit</button>
                <button onClick={() => handleDelete(item._id)}>🗑️ Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyGroceryDashboard;
