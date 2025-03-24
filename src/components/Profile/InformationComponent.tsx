"use client";
import * as React from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaUser, FaBirthdayCake } from "react-icons/fa";

interface UserProfileProps {
  first_name: string;
  last_name: string;
  avatar: string;
  role: string;
  email: string;
  contact_number: string;
  gender: string;

  birth_date: string;
  occupation: string;
};

const UserProfile: React.FC<{ userData: UserProfileProps}> = ({ userData }) => {
  const defaultAvatar = "/blank-profile.svg"; 

  return (

      <div className="w-full relative bg-white shadow-[0px_4px_20px_0px_rgba(0,0,0,0.25)] rounded-3xl p-8 pt-[12%] mt-[16%] text-center flex flex-col items-center">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white">

          <img
            src={userData.avatar || defaultAvatar}
            alt={`Profile picture of ${userData.first_name}`}
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
