"use client";

import Button from "@/components/BaseButton";
import BaseFormInput from "@/components/Global/BaseFormInput";
import { useState } from "react";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in with:", { email, password, rememberMe });
  };

  return (
    <div className="w-full max-w-md">
      <h1 className="text-5xl font-extrabold text-black mb-6">Login</h1>
      <p className="text-gray-600 mb-6">Welcome back! Please log in to your account.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <BaseFormInput
          label="Email"
          id="email-login"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon="email"
          color="black"
        />
        <BaseFormInput
          label="Password"
          id="pw-login"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon="password"
          color="black"
        />
        
        <div className="flex items-center justify-between mt-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded border-gray-300 text-black focus:ring-black"
            />
            <span className="ml-2 text-sm text-gray-600">Remember Me</span>
          </label>
          <a href="#" className="text-sm text-gray-600 hover:underline">
            Forgot Password?
          </a>
        </div>

        <div className="flex justify-center">
            <Button text="LOGIN" type="submit" className="w-64 py-3 text-lg" />
        </div>

        
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <a href="#" className="text-black hover:underline">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
}