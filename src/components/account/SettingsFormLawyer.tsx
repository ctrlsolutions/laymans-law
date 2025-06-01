"use client";

import { useState } from "react";
import Image from "next/image";
import BaseFormInput from "@/components/Global/BaseFormInput";
import Button from "@/components/BaseButton";

export default function Home() {
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      contactNumber: "",
      birthday: "",
      address: "",
      specialization: "",
      gender: "male",
      rollNumber: "",
      rolldate: ""
    });
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    const handleSaveChanges = () => {
      console.log("Saving changes:", formData);
    };
  
    const handleDeleteAccount = () => {
      console.log("Deleting account");
    };
  
    return (
      <div className="max-w-3xl mx-2 sm:mx-auto p-6 sm:p-8">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="relative">
            <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-200 mr-6">
              <Image
                src="https://i.pinimg.com/736x/93/dd/a6/93dda651f941477847f7f74835f67288.jpg"
                alt="Profile"
                width={160}
                height={160}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
    
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Personal Information
            </h1>
    
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <BaseFormInput
                label="First Name:"
                name="firstName"
                type="text"
                color="gray-900"
                icon="user"
                value={formData.firstName}
                onChange={handleInputChange}
              />
    
              <BaseFormInput
                label="Last Name:"
                name="lastName"
                type="text"
                color="gray-900"
                icon="user"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
    
            <BaseFormInput
              label="Contact number:"
              name="contactNumber"
              type="tel"
              color="gray-900"
              icon="tel"
              value={formData.contactNumber}
              onChange={handleInputChange}
            />
    
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="w-full">
            <label className="text-2xl font-bold text-gray-900 mb-2">Sex:</label>
            <div className="flex gap-1 mt-6">

            <label
                className={`flex items-center w-full h-12 px-4 border rounded-lg cursor-pointer ${
                    formData.gender === "male" ? "bg-gray-100 border-gray-900 text-gray-900" : "border-gray-300 text-gray-800" 
                }`}
                onClick={() => setFormData({ ...formData, gender: "male" })}
            >
                <div
                    className={`w-6 h-6 rounded-full border ${
                    formData.gender === "male" ? "bg-red border-red" : "border-gray-400"
                    } mr-2`}
                />
                Male
            </label>

            <label
                className={`flex items-center w-full h-12 px-4 border rounded-lg cursor-pointer ${
                    formData.gender === "female" ? "bg-gray-100 border-gray-900 text-gray-900" : "border-gray-300 text-gray-800"
                }`}
                onClick={() => setFormData({ ...formData, gender: "female" })}
            >
                <div
                    className={`w-6 h-6 rounded-full border ${
                    formData.gender === "female" ? "bg-red border-red" : "border-gray-400"
                    } mr-2`}
                />
                Female
            </label>
          </div>
        </div>

        {/* Birthday Field */}
        <BaseFormInput
            label="Birthday"
            name="birthday"
            type="date"
            color="gray-900"
            icon="calendar"
            value={formData.birthday}
            onChange={handleInputChange}
            className="appearance-none px-4 py-2 border border-gray-300 rounded-lg text-gray-900 w-full h-11"
        />
      </div>

            <BaseFormInput
              label="Address:"
              name="address"
              type="text"
              color="gray-900"
              icon="hash"
              value={formData.address}
              onChange={handleInputChange}
            />
    
            <BaseFormInput
              label="Specialization"
              name="specialization"
              type="text"
              color="gray-900"
              icon="hash"
              value={formData.occupation}
              onChange={handleInputChange}
            />
            <div className="grid grid-cols-2 gap-4 mt-4">
                <BaseFormInput
                    label="Roll Number:"
                    name="rollNumber"
                    type="text"
                    color="gray-900"
                    icon="hash"
                    value={formData.rollNumber || ""}
                    onChange={handleInputChange}
                    className="font-bold text-gray-800 bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 w-full"
                />

                <BaseFormInput
                    label="Rolldate Issued:"
                    name="rolldate"
                    type="date"
                    color="gray-900"
                    icon="calendar"
                    value={formData.birthday}
                    onChange={handleInputChange}
                    className="font-bold text-gray-800 bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 w-full"
                />
            </div>
          </div>
        </div> 
        <div className="flex justify-between text-sm mt-10">
              <Button text="Delete Account" color="red" onClick={handleDeleteAccount} />
              <Button text="Save Changes" color="red" onClick={handleSaveChanges} />
        </div>
      </div>
    );
}