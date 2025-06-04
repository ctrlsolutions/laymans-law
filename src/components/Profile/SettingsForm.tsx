"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import BaseFormInput from "@/components/Global/BaseFormInput";
import { toast, ToastContainer } from "react-toastify";
import Button from "@/components/Global/BaseButton";
import { getProfile, updateProfile } from "@/services/ProfileServices";

interface SettingsFormProps {
  userType: "layman" | "lawyer";
}

export default function SettingsForm({ userType }: SettingsFormProps) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    contact_number: "",
    birth_date: "",
    address: "",
    occupation: "",
    gender: "",
    roll_number: "",
    roll_sign_date: "",
  });

  const [editableFields, setEditableFields] = useState<Record<string, boolean>>(
    {}
  );
  const [updatedFields, setUpdatedFields] = useState<Record<string, unknown>>(
    {}
  );

  const toggleEditable = (field: string) => {
    if (!(field in editableFields)) {
      setEditableFields((prev) => ({ ...prev, [field]: true }));
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    // Track only changed fields
    setUpdatedFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    if (Object.keys(updatedFields).length === 0) {
      console.log("No changes detected");
      return;
    }

    const response = await updateProfile(updatedFields);

    if (response.success) {
      toast.success("Profile updated successfully!");
      console.log(response.message);
      setUpdatedFields({}); // Reset changed fields after save
    } else {
      console.error(response.message);
    }
  };

  const handleDeleteAccount = () => {
    console.log("Deleting account");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await getProfile();
      if (response.success && response.data) {
        setFormData(response.data);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="max-w-3xl mx-2 sm:mx-auto sm:p-8 flex flex-col">
      <ToastContainer />
      <div className="flex flex-row gap-5">
        <div className="relative">
          <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-200">
            <Image
              src="/blank-profile.svg"
              alt="Profile"
              width={160}
              height={160}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="max-h-[60vh] bg-white p-2">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Personal Information
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <BaseFormInput
                  icon="edit"
                  label="First Name"
                  name="first_name"
                  type="text"
                  value={formData.first_name}
                  onChange={handleChange}
                  disabled={!editableFields.first_name}
                  onIconClick={() => toggleEditable("first_name")}
                />
                <BaseFormInput
                  icon="edit"
                  label="Last Name"
                  name="last_name"
                  type="text"
                  value={formData.last_name}
                  onChange={handleChange}
                  disabled={!editableFields.last_name}
                  onIconClick={() => toggleEditable("last_name")}
                />
              </div>
              <BaseFormInput
                icon="edit"
                label="Contact Number"
                name="contact_number"
                type="tel"
                value={formData.contact_number}
                onChange={handleChange}
                disabled={!editableFields.contact_number}
                onIconClick={() => toggleEditable("contact_number")}
              />
              <div className="grid grid-cols-2 gap-4 mt-2">
                <BaseFormInput
                  icon="edit"
                  label="Gender"
                  name="gender"
                  type="text"
                  value={formData.gender}
                  onChange={handleChange}
                  disabled={!editableFields.gender}
                  onIconClick={() => toggleEditable("gender")}
                />
                <BaseFormInput
                  icon="edit"
                  label="Birthday"
                  name="birth_date"
                  type="date"
                  value={formData.birth_date}
                  onChange={handleChange}
                  disabled={!editableFields.birth_date}
                  onIconClick={() => toggleEditable("birth_date")}
                />
              </div>
              {userType === "lawyer" && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <BaseFormInput
                    label="Roll Number:"
                    name="roll_number"
                    type="text"
                    value={formData.roll_number}
                    onChange={handleChange}
                    disabled={!editableFields.roll_number}
                    onIconClick={() => toggleEditable("roll_number")}
                  />
                  <BaseFormInput
                    label="Roll Signed Date:"
                    name="roll_sign_date"
                    type="date"
                    value={formData.roll_sign_date}
                    onChange={handleChange}
                    disabled={!editableFields.roll_sign_date}
                    onIconClick={() => toggleEditable("roll_sign_date")}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

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
