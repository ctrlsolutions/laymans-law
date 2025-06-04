"use client";

import { useEffect, useState } from "react";
import { getProfile } from "@/services/ProfileServices";
import InformationContainer from "@/components/Profile/InformationContainer";
import InformationComponent from "@/components/Profile/InformationComponent";
import Card from "@/components/Profile/Card";
import { UserProfileProps } from "@/components/Profile/InformationComponent";

export default function LawyerDetails() {
  const [user, setUser] = useState<UserProfileProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const response = await getProfile();
      if (response.success && response.data) {
        setUser(response.data as UserProfileProps);
      } else {
        console.error("Error fetching user data:", response.message);
      }
      setLoading(false);
    };

    fetchUserProfile();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-[57vh]">
          <p>Loading...</p>
        </div>
      ) : user ? (
        <Card className="h-[56.5vh] flex items-center justify-center">
          <InformationContainer>
            <InformationComponent userData={user} />
          </InformationContainer>
        </Card>
      ) : (
        <div className="flex items-center justify-center h-[57vh]">
          <p>Error loading user data.</p>
        </div>
      )}
    </>
  );
}
