"use client";

import { useState } from "react";
import BaseFormInput from "@/components/Global/BaseFormInput";
import BaseFormSelect from "@/components/Global/BaseFormSelect";
import Button from "@/components/Global/BaseButton";

interface SettingsFormProps {
  userType: "layman" | "lawyer";
}

export default function SettingsForm({ userType }: SettingsFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    birthday: "",
    address: "",
    occupation: "",
    gender: "male",
    rollNumber: "",
    rolldate: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSaveChanges = () => {
    console.log("Saving changes:", formData);
  };

  const handleDeleteAccount = () => {
    console.log("Deleting account");
  };

  return (
    <div className="max-w-3xl mx-2 sm:mx-auto p-6 sm:p-8 flex flex-col">
      {/* Scrollable Inputs Container */}
      <div className="flex flex-row gap-5">
        <div className="relative">
          <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-200">
            <img
              src="https://i.pinimg.com/736x/93/dd/a6/93dda651f941477847f7f74835f67288.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-4 border rounded-lg shadow">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Personal Information
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <BaseFormInput
                  label="First Name"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <BaseFormInput
                  label="Last Name"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <BaseFormInput
                label="Contact Number"
                name="contactNumber"
                type="tel"
                value={formData.contactNumber}
                onChange={handleChange}
              />
              <div className="grid grid-cols-2 gap-4 mt-2">
                <BaseFormSelect
                  label="Gender"
                  name="gender"
                  value={formData.gender}
                  choices={[
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                    { label: "Other", value: "other" },
                  ]}
                  onChange={handleChange}
                />
                <BaseFormInput
                  label="Birthday"
                  name="birthday"
                  type="date"
                  value={formData.birthday}
                  onChange={handleChange}
                  className="appearance-none px-4 py-2 border border-gray-300 rounded-lg text-gray-900 w-full h-11"
                />
              </div>
              <BaseFormInput
                label="Occupation"
                name="occupation"
                type="text"
                value={formData.occupation}
                onChange={handleChange}
              />
              {userType === "lawyer" && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <BaseFormInput
                    label="Roll Number:"
                    name="rollNumber"
                    type="text"
                    value={formData.rollNumber}
                    onChange={handleChange}
                    className="font-bold text-gray-800 bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 w-full"
                  />
                  <BaseFormInput
                    label="Roll Signed Date:"
                    name="rolldate"
                    type="date"
                    value={formData.rolldate}
                    onChange={handleChange}
                    className="font-bold text-gray-800 bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 w-full h-full"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Buttons Outside Scroll Container */}
      <div className="flex justify-between text-sm mt-4">
        <Button color="red" onClick={handleDeleteAccount}>
          Delete Account
        </Button>
        <Button color="red" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </div>
    </div>
  );
}
