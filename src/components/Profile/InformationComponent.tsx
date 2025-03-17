"use client";
import * as React from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaUser, FaBirthdayCake } from "react-icons/fa";

const user = {
  name: "Chre Tuazon",
  avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/251a365897e81546dfda656995206fc56dea6746280e5f38dfdfcf0a37ff9b98?placeholderIfAbsent=true&apiKey=b97adb845ad745fdabf283f95e3c166e",
  role: "Layman",
  address: "Fili Hotel, Nustar, Cebu City, 6000",
  email: "cptuazon@gmail.com",
  phone: "09691236969",
  gender: "Male",
  birthdate: "November 1, 1969",
  occupation: "Farmer",
};

const UserProfile: React.FC = () => {
  return (

      <div className="w-full relative bg-white shadow-[0px_4px_20px_0px_rgba(0,0,0,0.25)] rounded-3xl p-5 pt-[12%] mt-[35%] text-center flex flex-col items-center m-3">
          <img
            src={user.avatar}
            alt={`Profile picture of ${user.name}`}
            className="w-[50%] h-auto rounded-transparent -mt-[50%]"
          />
        <div className="mt-2 w-full text-center">
          <h1 className="text-xl font-bold text-black truncate">{user.name}</h1>
          <p className="text-l font-bold text-red overflow-hidden">{user.role}</p>
        </div>
        <div className="mt-2 text-left text-sm text-black font-bold space-y-3 truncate">
          <p className="flex items-center gap-2"><FaMapMarkerAlt className="text-sm" />{user.address}</p>
          <p className="flex items-center gap-2"><FaEnvelope className="text-sm" /><a href={`mailto:${user.email}`} className="hover:underline">{user.email}</a></p>
          <p className="flex items-center gap-2"><FaPhone className="text-sm" /><a href={`tel:${user.phone}`} className="hover:underline">{user.phone}</a></p>
          <p className="flex items-center gap-2"><FaUser className="text-sm" />{user.gender}</p>
          <p className="flex items-center gap-2"><FaBirthdayCake className="text-sm" />{user.birthdate}</p>
          <p className="ml-7">{user.occupation}</p>
        </div>
      </div>

  );
};

export default UserProfile;