"use client";

import { useState } from "react";
import BaseButton from "@/components/Global/BaseButton";
import BaseFormInput from "@/components/Global/BaseFormInput";
import { LoginData } from "@/interface/AuthTypes";
import { validateField } from "@/utils/AuthValidators";
import { handleInputChange, handleInputBlur } from "@/utils/AuthUtils";
import { UserLogin } from "@/services/AuthServices";
import { ToastContainer, toast, Bounce } from "react-toastify";

export default function LoginForm() {
  const [form, setForm] = useState<LoginData>({ email: "", password: "" });
  const [errors, setErrors] = useState<Partial<LoginData>>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(event, setForm, setErrors, validateField);
  };

  const handleBlur = (
    event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    handleInputBlur(event, setErrors, validateField, form);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      email: validateField("email", form.email, form),
      password: validateField("password", form.password, form),
    };

    setErrors(newErrors);

    if (newErrors.email || newErrors.password) return;

    const response = await UserLogin(form.email, form.password);

    if (response.success) {
      const notify = () =>
        toast("Login successful. Welcome back!", {
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
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <ToastContainer />
      <div>
        <BaseFormInput
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onBlur={handleBlur}
          onChange={handleChange}
          icon="email"
          color="black"
          width="100%"
        />
        {errors.email && <p className="text-gray-500">{errors.email}</p>}
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
          onBlur={handleBlur}
          onIconClick={() => setShowPassword(!showPassword)}
        />
        {errors.password && <p className="text-gray-500">{errors.password}</p>}
      </div>

      <BaseButton type="submit" color="black" textColor="white" width="100%">
        LOGIN
      </BaseButton>
    </form>
  );
}
