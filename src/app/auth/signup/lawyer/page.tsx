"use client";
import { useState } from "react";
import SignupForm from "../signupForm";
import Layout from "@/app/auth/AuthLayout";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
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
    <Layout bgColor="blue">
        <div className="flex items-center justify-center h-full">
        <SignupForm
        />
        </div>
    </Layout>
  );
}
