"use client";
import * as React from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaUser, FaBirthdayCake } from "react-icons/fa";

interface UserProfileProps {
  name: string;
  avatar: string;
  role: string;
  email: string;
  phone: string;
  gender: string;
  birthdate: string;
}

const UserProfile: React.FC<{ userData: UserProfileProps }> = ({ userData }) => {
  const defaultAvatar = "/DefaultProfile.png";  // Updated to local image path

  return (
    <div className="w-full pt-[3rem] pl-[3rem] bg-white shadow-lg rounded-3xl p-8 border flex flex-col items-start">
      <div className="flex items-center gap-6">
        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-purple-950">
          <img
            src={userData.avatar || defaultAvatar}
            alt={`Profile picture of ${userData.name}`}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-">{userData.name}</h1>
          <p className="text-xl font-bold text-purple-950">{userData.role}</p>
        </div>
      </div>

      <div className="mt-8 pt-[1rem] pl-[.5rem] pb-[3rem] text-lg text-black font-bold space-y-4">
        <p className="flex items-center gap-2"><FaEnvelope className="text-purple-900" /><a href={`mailto:${userData.email}`} className="hover:underline">{userData.email}</a></p>
        <p className="flex items-center gap-2"><FaPhone className="text-purple-900" /><a href={`tel:${userData.phone}`} className="hover:underline">{userData.phone}</a></p>
        <p className="flex items-center gap-2"><FaUser className="text-purple-900" />{userData.gender}</p>
        <p className="flex items-center gap-2"><FaBirthdayCake className="text-purple-900" />{userData.birthdate}</p>
      </div>
    </div>
  );
};

export default UserProfile;
