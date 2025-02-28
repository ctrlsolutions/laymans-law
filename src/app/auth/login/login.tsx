"use client";

import BaseButton from "@/components/BaseButton";
import BaseFormInput from "@/components/Global/BaseFormInput";
import { useState } from "react";

type FormState = {
  email: string;
  password: string;
  [key: string]: string;
};

export default function Login() {
  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormState>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateField = (name: string, value: string) => {
    const trimmedValue = value.trim();

    if (name === "email") {
      if (!trimmedValue) {
        return "Email is required.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) {
        return "Invalid email format.";
      }
      return ""; 
    }

    if (name === "password") {
      if (!trimmedValue) {
        return "Password is required.";
      } else if (trimmedValue.length < 3) {
        return "Password must be at least 3 characters.";
      }
      return "";
    }

    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

    const error = validateField(name, value);
    setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      console.log("Login form submitted!"); // Add this log

      const newErrors = {
          email: validateField("email", form.email),
          password: validateField("password", form.password),
      };

      setErrors(newErrors);

      if (newErrors.email || newErrors.password) {
          console.log("Validation failed!", newErrors);
          return; // Stop execution if there are errors
      }

      console.log("Validation passed, sending request...");

      try {
          const response = await fetch("http://127.0.0.1:8000/api/user/login/", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              credentials: "include", // Important for CSRF protection
              body: JSON.stringify({
                  email: form.email,
                  password: form.password,
              }),
          });

          const data = await response.json();
          console.log("Server response:", data);

          if (response.ok) {
              console.log("Login successful! User ID:", data.user_id);
          } else {
              console.log("Login failed:", data);
          }
      } catch (error) {
          console.error("Error during login:", error);
      }
  };

  


  const toggleShowPassword = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  return (
    <div className="h-fit w-full items-center justify-center max-w-4xl flex flex-col gap-9 my-8 px-6 sm:gap-3">
      <h1 className="text-3xl sm:text-4xl m:tex-3xl lg:text-5xl font-extrabold text-black w-full">Login</h1>
      <p className="text-gray-600 w-full sm:text-1xl">Welcome back! Please log in to your account.</p>

      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <div>
          <BaseFormInput
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            icon="email"
            color="black"
            width="100%"
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>

        <div>
          <BaseFormInput
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            icon={showPassword ? "passhide" : "pass"}
            color="black"
            width="100%"
            onIconClick={toggleShowPassword}
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>

        <div className="flex items-center justify-between mt-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-black focus:ring-black"
            />
            <span className="ml-2 text-sm text-gray-600">Remember Me</span>
          </label>
          <a href="#" className="text-sm text-gray-600 hover:underline">
            Forgot Password?
          </a>
        </div>

        <BaseButton
          text={loading ? "Logging in..." : "LOGIN"}
          type="submit"
          color="black"
          textColor="white"
          width="100%"
          disabled={loading}
        />

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <a href="#" className="text-black font-bold hover:underline">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
}
