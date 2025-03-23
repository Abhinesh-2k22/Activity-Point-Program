import React, { useEffect, useState } from "react";
import MyGroceryDashboard from "./MyGroceryDashboard";
import PublicGroceryView from "./PublicGroceryView";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

const GroceryPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { category } = useParams(); // pulled from route like /grocery/fruits or /grocery/all

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/auth/cookie", {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (user && user.role === "grocery_owner") {
    return (
      <div>
        <Navbar/>
        <MyGroceryDashboard />
      </div>
    );
  } else {
    return (
      <div>
        <Navbar/>
        <PublicGroceryView category={category || "all"} />
      </div>
    );
  }
};

export default GroceryPage;
