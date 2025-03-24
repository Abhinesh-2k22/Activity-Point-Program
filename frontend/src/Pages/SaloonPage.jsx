import React, { useEffect, useState } from "react";
import MySaloonDashboard from "./MySaloonDashboard";
import PublicSaloonView from "./PublicSaloonView";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

const SaloonPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { category } = useParams();

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

  return (
    <div>
      <Navbar />
      {user && user.role === "saloon_owner" ? (
        <MySaloonDashboard />
      ) : (
        <PublicSaloonView category={category || "all"} />
      )}
    </div>
  );
};

export default SaloonPage;
