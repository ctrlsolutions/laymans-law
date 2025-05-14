"use client";

import { useState, useEffect } from "react";
import BaseFormInput from "@/components/Global/BaseFormInput";
import BaseFormSelect from "@/components/Global/BaseFormSelect";
import BaseButton from "@/components/Global/BaseButton";

import { useRouter } from "next/navigation";
import { SignupData } from "@/interface/AuthTypes";
import { validateField } from "@/utils/AuthValidators";
import { UserSignup } from "@/services/AuthServices";
import { handleInputChange, handleInputBlur } from "@/utils/AuthUtils";
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
  };

  return (
    <div className="p-4 text-black w-full mx-auto h-full flex flex-col">
      <ToastContainer />
      <h2 className="text-3xl font-extrabold text-center">Create an account</h2>

      <form className="overflow-y-auto p-4" onSubmit={handleSubmit}>
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
            onBlur={handleBlur}
          />
        </div>

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

        <BaseFormInput
          label="Password"
          name="password"
          type="password"
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
          type="password"
          color={userType === "layman" ? "red" : "blue"}
          icon={showPassword ? "passhide" : "pass"}
          value={form.confirm_password}
          onChange={handleChange}
          onBlur={handleBlur}
          onIconClick={() => setShowPassword(!showPassword)}
        />
        {errors.confirm_password && (
          <p className="text-red-500 text-sm">{errors.confirm_password}</p>
        )}
        <div className="mt-5">
          <BaseButton type="submit">CREATE ACCOUNT</BaseButton>
        </div>
      </form>
    </div>
  );
}
