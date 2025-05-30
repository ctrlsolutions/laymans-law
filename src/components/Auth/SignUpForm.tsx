"use client";

import { useState, useEffect } from "react";
import BaseFormInput from "@/components/Global/BaseFormInput";
import BaseFormSelect from "@/components/Global/BaseFormSelect";
import BaseButton from "@/components/Global/BaseButton";

import { useRouter } from "next/navigation";
import { SignupData } from "@/interface/AuthTypes";
import { validateField } from "@/utils/AuthValidators";
import { UserSignup } from "@/services/AuthServices";
import TermsAndConditions from "@/app/(auth)/signup/TermsAndConditions";
import { handleInputChange, handleInputBlur } from "@/utils/AuthUtils";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { SignupFormProps } from "@/interface/AuthContainer";
import { FaSpinner } from "react-icons/fa";
import React from "react";

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
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false); // Add state for checkbox
  const [showTermsModal, setShowTermsModal] = useState(false);

  useEffect(() => {
    setForm((prevForm) => ({
      ...prevForm,
      user_type: userType,
    }));
  }, [userType]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    handleInputChange<SignupData>(event, setForm, setErrors, validateField);
  };

  const handleBlur = (
    event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    handleInputBlur(event, setErrors, validateField, form);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!agreed) {
      toast.error("You must agree with the Terms & Conditions.");
      return;
    }
    setLoading(true);

    try {
      const newErrors: Partial<SignupData> = {
        email: validateField("email", form.email, form),
        confirm_password: validateField(
          "confirm_password",
          form.confirm_password,
          form
        ),
      };

      const response = await UserSignup(form);
      if (response.success) {
        toast("Signup successful. Welcome aboard!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        router.push("/login");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 text-black w-full mx-auto h-full flex flex-col">
      <ToastContainer />
      <h2 className="text-3xl font-extrabold text-center">Create an account</h2>

      <TermsAndConditions show={showTermsModal} onClose={() => setShowTermsModal(false)} />

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
            onBlur={handleBlur}
          />
          <BaseFormInput
            label="Last Name"
            name="last_name"
            type="text"
            color={userType === "layman" ? "red" : "blue"}
            icon="user"
            value={form.last_name}
            onChange={handleChange}
            onBlur={handleBlur}
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
          onBlur={handleBlur}
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
          onBlur={handleBlur}
        />

        <div className="grid grid-cols-2 gap-6 mb-2">
          <BaseFormSelect
            label="Select Gender"
            name="gender"
            color="blue"
            value={form.gender}
            onChange={handleChange}
            choices={[
              { value: "", label: "Select", disabled: true },
              { value: "M", label: "Male" },
              { value: "F", label: "Female" },
              { value: "O", label: "Other" },
            ]}
          />

          <BaseFormInput
            label="Date of Birth"
            name="birth_date"
            type="date"
            color={userType === "layman" ? "red" : "blue"}
            icon="calendar"
            value={form.birth_date}
            onChange={handleChange}
            onBlur={handleBlur}
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
              onBlur={handleBlur}
            />
            <BaseFormInput
              label="Roll Signed Date"
              name="roll_signed_date"
              type="date"
              color="blue"
              icon="calendar"
              value={form.roll_signed_date || ""}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
        )}

        {/* Password Fields */}
        <BaseFormInput
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          color={userType === "layman" ? "red" : "blue"}
          icon={showPassword ? "passhide" : "pass"}
          value={form.password}
          onChange={handleChange}
          onBlur={handleBlur}
          onIconClick={() => setShowPassword(!showPassword)}
        />
        <BaseFormInput
          label="Re-Type Password"
          name="confirm_password"
          type={showConfirmPassword ? "text" : "password"}
          color={userType === "layman" ? "red" : "blue"}
          icon={showConfirmPassword ? "passhide" : "pass"}
          value={form.confirm_password}
          onChange={handleChange}
          onBlur={handleBlur}
          onIconClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle showConfirmPassword
        />
        {errors.confirm_password && (
          <p className="text-red-500 text-sm">{errors.confirm_password}</p>
        )}

        {/* Terms & Conditions Checkbox */}
        <div className="flex items-center mt-4 mb-2">
          <input
            id="terms"
            type="checkbox"
            checked={agreed}
            onChange={() => setAgreed(!agreed)}
            className="mr-2 accent-red-800"
          />
          <label htmlFor="terms" className="text-sm">
            I agree with the{" "}
            <button
              type="button"
              className="font-semibold underline text-red-800 hover:text-red-600 focus:outline-none"
              onClick={() => setShowTermsModal(true)}
              tabIndex={0}
            >
              Terms & Conditions
            </button>
          </label>
        </div>

        <div className="mt-5">
          <BaseButton
            type="submit"
            loading={loading}
            className="flex items-center justify-center w-full"
          >
            CREATE ACCOUNT
          </BaseButton>
        </div>
      </form>
    </div>
  );
}
