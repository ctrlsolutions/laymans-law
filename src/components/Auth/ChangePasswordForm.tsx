"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BaseButton from "@/components/Global/BaseButton";
import BaseFormInput from "@/components/Global/BaseFormInput";
import { ToastContainer, toast, Bounce } from "react-toastify";

export default function ChangePasswordForm() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [errors, setErrors] = useState<{ newPassword?: string; retypePassword?: string }>({});

  const validatePasswords = () => {
    const newErrors: typeof errors = {};

    if (!newPassword) {
      newErrors.newPassword = "New Password is required.";
    } else if (newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters.";
    }

    if (!retypePassword) {
      newErrors.retypePassword = "Please retype your password.";
    } else if (newPassword !== retypePassword) {
      newErrors.retypePassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePasswords()) return;

    // Call your API here to change the password

    toast.success("Password changed successfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      transition: Bounce,
    });

    setTimeout(() => {
      router.push("/login");
    }, 2100);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <ToastContainer />

      {/* New Password */}
      <div>
        <BaseFormInput
          label="New Password"
          name="newPassword"
          type={showNewPassword ? "text" : "password"}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          color="black"
          width="100%"
          icon={showNewPassword ? "passhide" : "pass"}
          onIconClick={() => setShowNewPassword(!showNewPassword)}
        />
        {errors.newPassword && <p className="text-gray-500">{errors.newPassword}</p>}
      </div>

      {/* Retype Password */}
      <div>
        <BaseFormInput
          label="Retype Password"
          name="retypePassword"
          type={showRetypePassword ? "text" : "password"}
          value={retypePassword}
          onChange={(e) => setRetypePassword(e.target.value)}
          color="black"
          width="100%"
          icon={showRetypePassword ? "passhide" : "pass"}
          onIconClick={() => setShowRetypePassword(!showRetypePassword)}
        />
        {errors.retypePassword && <p className="text-gray-500">{errors.retypePassword}</p>}
      </div>

      {/* Change Password Button */}
      <BaseButton type="submit" color="black" textColor="white" width="100%">
        Change Password
      </BaseButton>
    </form>
  );
}