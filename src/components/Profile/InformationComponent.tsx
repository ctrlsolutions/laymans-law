"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaUser, FaBirthdayCake } from "react-icons/fa";
import { UserType } from "@/interface/CaseTypes"

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
  user_type: string;
};

const UserProfile: React.FC<{ userData: UserProfileProps }> = ({ userData }) => {
  const defaultAvatar = "/blank-profile.svg"; 

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <div className="w-28 h-28 rounded-full overflow-hidden">
          <img
            src={
              userData.user_type.toLowerCase() === "lawyer"
                ? "/3.svg"
                : "/4.svg"
            }
            alt={`Profile picture of ${userData.first_name}`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="mt-2 w-full text-center">
          <h1 className="text-2xl font-bold text-black truncate">
            {`${userData.first_name} ${userData.last_name}`}
          </h1>
          <p className="text-l font-bold text-red overflow-hidden">
            {userData.user_type}
          </p>
        </div>
        <div className="flex flex-col gap-3 mt-4 text-sm text-black font-bold truncate">
          {/* <p className="flex items-center gap-2"><FaMapMarkerAlt className="text-sm" />{userData.address}</p> */}
          <p className="flex items-center gap-3"><FaEnvelope className="text-sm" /><a href={`mailto:${userData.email}`} className="hover:underline">{userData.email}</a></p>
          <p className="flex items-center gap-3"><FaPhone className="text-sm" /><a href={`tel:${userData.contact_number}`} className="hover:underline">{userData.contact_number}</a></p>
          <p className="flex items-center gap-3">
            <FaUser className="text-sm" />
            {userData.gender === "M" ? "Male" : userData.gender === "F" ? "Female" : "Other"}
          </p>
          <p className="flex items-center gap-3"><FaBirthdayCake className="text-sm" />{userData.birth_date}</p>
          <p className="ml-7">{userData.occupation}</p>
        </div>
      </div>
    </>
  );
};

export default UserProfile;