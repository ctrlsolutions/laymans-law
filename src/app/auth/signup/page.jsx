"use client";
import { useState } from "react";
import SignupForm from "./signup";

export default function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }
    setError("");
    
    // Simulated submission (replace with API call)
    console.log("Submitted:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <SignupForm />
    </div>
  );
}
