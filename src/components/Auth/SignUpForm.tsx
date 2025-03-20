"use client";

import { useState, useEffect } from "react";
import BaseFormInput from "@/components/Global/BaseFormInput";
import BaseFormSelect from "@/components/Global/BaseFormSelect";
import BaseButton from "@/components/Global/BaseButton";

import { useRouter } from "next/navigation";
import { SignupData } from "@/interface/AuthTypes";
import { validateField } from "@/utils/AuthValidators";
import { signupUser } from "@/services/AuthServices";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { SignupFormProps } from "@/interface/AuthContainer";

export default function SignupForm({ userType = "layman" }: SignupFormProps) {
  const router = useRouter();

  const [form, setForm] = useState<SignupData>({
    first_name: "",
    last_name: "",
    email: "",
    contact_number: "",
    gender: "",
    birth_date: "",
    password: "",
    confirm_password: "",
    user_type: "",
    roll_number: "",
    roll_signed_date: "",
  });

  const [errors, setErrors] = useState<Partial<SignupData>>({});
  const [showPassword, setShowPassword] = useState(false);

  // Handle Input Changes
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = event.target;

    setForm((prevForm) => {
      const updatedForm = { ...prevForm, [id]: value };

      setErrors((prevErrors) => ({
        ...prevErrors,
        [id]: validateField(id, value, updatedForm),
      }));

      return updatedForm;
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Submitting form:", form);

    const newErrors: Partial<SignupData> = {
      email: validateField("email", form.email, form),
      confirm_password: validateField(
        "confirm_password",
        form.confirm_password,
        form
      ),
    };
    console.log("FORM DATA", form);
    // const response = await signupUser(form);
    // if (response.success) {
    //   toast.success(response.message);
    //   router.push("/auth/login");
    // } else {
    //   toast.error(response.message);
    // }
  };

  return (
    <div className="p-4 text-black w-full mx-auto h-full flex flex-col">
      <ToastContainer />
      <h2 className="text-3xl font-extrabold text-center">Create an account</h2>

      <form className="overflow-y-auto p-4" onSubmit={handleSubmit}>
        {/* First & Last Name */}
        <div className="grid grid-cols-2 gap-6 mb-2">
          <BaseFormInput
            label="First Name"
            name="first_name"
            color={userType === "layman" ? "red" : "blue"}
            type="text"
            icon="user"
            value={form.first_name}
            onChange={handleChange}
          />
          <BaseFormInput
            label="Last Name"
            name="last_name"
            type="text"
            color={userType === "layman" ? "red" : "blue"}
            icon="user"
            value={form.last_name}
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <BaseFormInput
          label="Email"
          name="email"
          type="email"
          color={userType === "layman" ? "red" : "blue"}
          icon="email"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        {/* Contact No. */}
        <BaseFormInput
          label="Contact No."
          name="contact_number"
          color={userType === "layman" ? "red" : "blue"}
          type="tel"
          icon="hash"
          value={form.contact_number}
          onChange={handleChange}
        />

        {/* Gender & Birth Date */}
        <div className="grid grid-cols-2 gap-6 mb-2">
          <BaseFormSelect
            label="Select Gender"
            name="gender"
            value={form.gender}
            choices={[
              { label: "Male", value: "M" },
              { label: "Female", value: "F" },
              { label: "Other", value: "O" },
            ]}
            onChange={handleChange}
          />

          <BaseFormInput
            label="Date of Birth"
            name="birth_date"
            type="date"
            color={userType === "layman" ? "red" : "blue"}
            icon="calendar"
            value={form.birth_date}
            onChange={handleChange}
          />
        </div>

        {/* Conditional Fields for Lawyers */}
        {userType === "lawyer" && (
          <div className="grid grid-cols-2 gap-6 mb-2">
            <BaseFormInput
              label="Roll No."
              name="roll_number"
              type="number"
              color="blue"
              icon="hash"
              value={form.roll_number || ""}
              onChange={handleChange}
            />
            <BaseFormInput
              label="Roll Signed Date"
              name="roll_signed_date"
              type="date"
              color="blue"
              icon="calendar"
              value={form.roll_signed_date || ""}
              onChange={handleChange}
            />
          </div>
        )}

        {/* Password Fields */}
        <BaseFormInput
          label="Password"
          name="password"
          type="password"
          color={userType === "layman" ? "red" : "blue"}
          icon={showPassword ? "passhide" : "pass"}
          value={form.password}
          onChange={handleChange}
        />
        <BaseFormInput
          label="Re-Type Password"
          name="confirm_password"
          type="password"
          color={userType === "layman" ? "red" : "blue"}
          icon={showPassword ? "passhide" : "pass"}
          value={form.confirm_password}
          onChange={handleChange}
        />
        {errors.confirm_password && (
          <p className="text-red-500 text-sm">{errors.confirm_password}</p>
        )}
        <BaseButton type="submit">CREATE ACCOUNT</BaseButton>
      </form>
    </div>
  );
}
