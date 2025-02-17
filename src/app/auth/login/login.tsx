"use client";

import BaseButton from "@/components/BaseButton";
import BaseFormInput from "@/components/Global/BaseFormInput";
import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateField = (name: string, value: string) => {
    if (name === 'email') {
      if (!value) {
        return "Email is required.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return "Invalid email format.";
      }
    }
    
    if (name === 'password') {
      if (!value) {
        return "Password is required.";
      } else if (value.length < 6) {
        return "Password must be at least 6 characters.";
      }
    }
    
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm(prev => ({ ...prev, [id]: value }));

    if (errors[id] || !value) {
      const error = validateField(id, value);
      setErrors(prev => ({ ...prev, [id]: error }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = {
      email: validateField('email', form.email),
      password: validateField('password', form.password)
    };
    
    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password) {
      console.log("Form submitted successfully!", form);
    }
  };

  return (
    <div className="h-fit w-full items-center justify-center max-w-4xl flex flex-col gap-9 my-8 px-6 sm:gap-3">
      <h1 className="text-3xl sm:text-4xl m:tex-3xl lg:text-5xl font-extrabold text-black w-full">Login</h1>
      <p className="text-gray-600 w-full sm:text-1xl">Welcome back! Please log in to your account.</p>

      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <div>
          <BaseFormInput
            label="Email"
            id="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            icon="email"
            color="black"
            width="100%"
          />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email}</p>
          )}
        </div>

        <div>
          <BaseFormInput
            label="Password"
            id="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            icon="pass"
            color="black"
            width="100%"
          />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password}</p>
          )}
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

        <BaseButton text="LOGIN" type="submit" color="black" textColor="white" width="100%" />

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