"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaUser, FaBirthdayCake } from "react-icons/fa";

interface UserProfileProps {
  first_name: string;
  last_name: string;
  avatar: string;
  role: string;
  address: string;
  email: string;
  contact_number: string;
  gender: string;
  birth_date: string;
  occupation: string;
};

const UserProfile: React.FC<{ userData: UserProfileProps}> = ({ userData }) => {
  const defaultAvatar = "https://via.placeholder.com/150"; 

  return (

      <div className="w-full relative bg-white shadow-[0px_4px_20px_0px_rgba(0,0,0,0.25)] rounded-3xl p-8 pt-[12%] mt-[16%] text-center flex flex-col items-center">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-900">
          <img
            src={userData.avatar || defaultAvatar}
            alt={`Profile picture of ${userData.first_name}`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="mt-2 w-full text-center">
          <h1 className="text-xl font-bold text-black truncate">
            {`${userData.first_name} ${userData.last_name}`}
          </h1>
          <p className="text-l font-bold text-red overflow-hidden">{userData.role}</p>
        </div>
        <div className="mt-2 text-left text-sm text-black font-bold space-y-3 truncate">
          {/* <p className="flex items-center gap-2"><FaMapMarkerAlt className="text-sm" />{userData.address}</p> */}
          <p className="flex items-center gap-2"><FaEnvelope className="text-sm" /><a href={`mailto:${userData.email}`} className="hover:underline">{userData.email}</a></p>
          <p className="flex items-center gap-2"><FaPhone className="text-sm" /><a href={`tel:${userData.contact_number}`} className="hover:underline">{userData.contact_number}</a></p>
          <p className="flex items-center gap-2">
            <FaUser className="text-sm" />
            {userData.gender === "M" ? "Male" : userData.gender === "F" ? "Female" : "Other"}
          </p>
          <p className="flex items-center gap-2"><FaBirthdayCake className="text-sm" />{userData.birth_date}</p>
          <p className="ml-7">{userData.occupation}</p>
        </div>
      </div>

  );
};

export default UserProfile;