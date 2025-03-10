"use client";

import { useEffect, useState } from "react";

export default function Details() {
    const [user, setUser] = useState<{
        firstName: string;
        lastName: string;
        email: string;
        contactNumber: string;
        birthDate: string;
        gender: string;
    } | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
    
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                if (parsedUser && typeof parsedUser === "object") {
                    setUser(parsedUser);
                    return; // No need to fetch if user exists
                }
            } catch (error) {
                console.error("Error parsing user data:", error);
                localStorage.removeItem("user");  // 🛠 Remove invalid data
            }
        }
    
        const token = localStorage.getItem("token");
        if (!token) {
            console.warn("No token found, skipping API call.");
            return;
        }
    
        fetch("http://127.0.0.1:8000/api/user/user/", {
            method: "GET",
            headers: {
                "Authorization": `Token ${token}`  // ✅ Ensure correct token format
            }
        })
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            if (data?.firstName && data?.lastName) {
                const userData = {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    contactNumber: data.contact_number, // ✅ Include new fields
                    birthDate: data.birth_date,        // ✅ Include new fields
                    gender: data.gender,               // ✅ Added gender
                };
                setUser(userData);
                localStorage.setItem("user", JSON.stringify(userData)); // ✅ Store updated data
            } else {
                console.warn("Invalid user data received:", data);
            }
        })
        .catch(error => console.error("Error fetching user data:", error));
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-[500px] w-[700px] bg-gradient-to-br from-[#d76e86] to-[#6e9fd7] relative">
            <h1 className="text-5xl font-extrabold text-white absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap drop-shadow-md">
                Account Details
            </h1>

            <div className="relative mt-24">
                <div className="w-32 h-32 border-4 border-white shadow-lg rounded-full mx-auto mb-3 overflow-hidden">
                    <img 
                        src="https://www.gravatar.com/avatar/?d=mp&s=128" 
                        alt="Anonymous Profile" 
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="bg-white/80 backdrop-blur-md p-6 rounded-lg shadow-xl w-80 text-center">
                    <h2 className="text-lg font-semibold mb-2 text-gray-800">
                        {user ? `${user.firstName} ${user.lastName}` : "Loading..."}
                    </h2>
                    <div className="text-left space-y-2 text-gray-700">
                        <p><span className="font-semibold">Email:</span> {user ? user.email : "Loading..."}</p>
                        <p><span className="font-semibold">Contact:</span> {user ? user.contactNumber : "Loading..."}</p>
                        <p><span className="font-semibold">Birth Date:</span> {user ? user.birthDate : "Loading..."}</p>
                        <p><span className="font-semibold">Gender:</span> {user ? user.gender : "Loading..."}</p> {/* ✅ Added gender */}
                    </div>
                </div>
            </div>
        </div>
    );
}
