"use client";
import { useEffect, useState } from "react";
import InformationContainer from "@/components/Profile/InformationContainer";
import InformationComponent from "@/components/Profile/InformationComponent";
import { getProfile } from "@/services/ProfileServices";
import Card from "@/components/Profile/Card";
import { User } from "@/interface/AuthTypes";

type ExtendedUser = User & {
  avatar?: string;
  role?: string;
  address?: string;
  occupation?: string;
};

export default function LaymanDetails() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
        const response = await getProfile();
        if (response.success && response.data) {
            setUser(response.data as User);
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
          <Card className="h-[55vh]">
            <InformationContainer>
              <InformationComponent userData={{
                ...{
                  first_name: String((user as ExtendedUser).first_name || ""),
                  last_name: String((user as ExtendedUser).last_name || ""),
                  avatar: String((user as ExtendedUser).avatar || "/blank-profile.svg"),
                  role: String((user as ExtendedUser).role || "User"),
                  address: String((user as ExtendedUser).address || ""),
                  email: String((user as ExtendedUser).email || ""),
                  contact_number: String((user as ExtendedUser).contact_number || ""),
                  gender: String((user as ExtendedUser).gender || ""),
                  birth_date: String((user as ExtendedUser).birth_date || ""),
                  occupation: String((user as ExtendedUser).occupation || "")
                }
              }} />
            </InformationContainer>
          </Card>
        ) : (
            <p>Error loading user data.</p>
        )}
      </>
    );
  }
  
