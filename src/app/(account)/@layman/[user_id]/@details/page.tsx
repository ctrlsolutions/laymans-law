"use client";
import { useEffect, useState } from "react";
import InformationComponent from "@/components/Profile/InformationComponent";
import { getProfile } from "@/services/ProfileServices";

export default function LaymanDetails() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
        const response = await getProfile();
        if (response.success && response.data) {
            setUser(response.data);
        } else {
            console.error("Error fetching user data:", response.message);
        }
        setLoading(false);
    };

    fetchUserProfile();
  }, []);

    return (
      <>
        <div className="w-full bg-red-500 h-full flex flex-col flex-wrap justify-between content-between">
          {loading ? (
              <p>Loading...</p>
          ) : user ? (
              <InformationComponent userData={user} />
          ) : (
              <p>Error loading user data.</p>
          )}
        </div>
      </>
    );
  }
  
