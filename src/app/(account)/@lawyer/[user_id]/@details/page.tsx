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
            <p>Loading...</p>
        ) : user ? (
          <Card className="h-[48.4vh]">
            <InformationContainer>
              <InformationComponent userData={user} />
            </InformationContainer>
          </Card>
        ) : (
            <p>Error loading user data.</p>
        )}
      </>
    );
  }
  
