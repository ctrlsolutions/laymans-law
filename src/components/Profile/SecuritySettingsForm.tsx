"use client";

import { useEffect, useState } from "react";
import BaseFormInput from "@/components/Global/BaseFormInput";
import BaseButton from "@/components/Global/BaseButton";
import { toast, ToastContainer } from "react-toastify";
import {
  getProfile,
  updateEmail,
  changePassword,
} from "@/services/ProfileServices";

export default function SecuritySettingsForm() {
  const [formData, setFormData] = useState({
    email: "",
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const toggleVisibility = (field: "current" | "new" | "confirm") => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await getProfile();
      if (res.success && res.data?.email) {
        const { email } = res.data;
        setFormData((prev) => ({ ...prev, email }));
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === "new_password" || name === "confirm_password") {
        setPasswordsMatch(updated.new_password === updated.confirm_password);
      }
      return updated;
    });
  };

  const handleUpdateEmail = async () => {
    try {
      const res = await updateEmail({ email: formData.email });
      res.success
        ? toast.success("Email updated successfully!")
        : toast.error(res.message || "Failed to update email.");
    } catch {
      toast.error("Failed to update email.");
    }
  };

  const handleChangePassword = async () => {
    if (!passwordsMatch) {
      toast.error("New passwords do not match.");
      return;
    }

    try {
      const res = await changePassword({
        current_password: formData.current_password,
        new_password: formData.new_password,
      });

      if (res.success) {
        toast.success("Password updated successfully!");
        setFormData({
          email: formData.email,
          current_password: "",
          new_password: "",
          confirm_password: "",
        });
        setPasswordsMatch(true);
      } else {
        toast.error(res.message || "Failed to update password.");
      }
    } catch {
      toast.error("Failed to update password.");
    }
  };

  return (
    <div className="max-w-xl mx-1 sm:mx-auto sm:p-8 flex flex-col space-y-1">
      <ToastContainer />
      <h2 className="text-3xl font-semibold text-gray-800 mb-1">
        Security Settings
      </h2>
      <BaseFormInput
        type="email"
        name="email"
        label="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <div className="flex justify-end mt-4">
        <BaseButton color="red" onClick={handleUpdateEmail}>
          Update Email
        </BaseButton>
      </div>
      <BaseFormInput
        type={showPassword.current ? "text" : "password"}
        name="current_password"
        label="Current Password"
        value={formData.current_password}
        onChange={handleChange}
        icon={showPassword.current ? "passhide" : "pass"}
        onIconClick={() => toggleVisibility("current")}
      />
      <BaseFormInput
        type={showPassword.new ? "text" : "password"}
        name="new_password"
        label="New Password"
        value={formData.new_password}
        onChange={handleChange}
        icon={showPassword.new ? "passhide" : "pass"}
        onIconClick={() => toggleVisibility("new")}
      />
      <BaseFormInput
        type={showPassword.confirm ? "text" : "password"}
        name="confirm_password"
        label="Confirm New Password"
        value={formData.confirm_password}
        onChange={handleChange}
        icon={showPassword.confirm ? "passhide" : "pass"}
        onIconClick={() => toggleVisibility("confirm")}
      />
      {!passwordsMatch && (
        <span className="text-red-500 text-sm mt-1 ml-1">
          Passwords do not match.
        </span>
      )}
      <div className="flex justify-end space-x-2 mt-4">
        <BaseButton color="red" onClick={handleChangePassword}>
          Update Password
        </BaseButton>
      </div>
    </div>
  );
}
