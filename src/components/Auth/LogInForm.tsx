"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BaseButton from "@/components/Global/BaseButton";
import BaseFormInput from "@/components/Global/BaseFormInput";
import { LoginData } from "@/interface/AuthTypes";
import { validateField } from "@/utils/AuthValidators";
import { handleInputChange, handleInputBlur } from "@/utils/AuthUtils";
import { UserLogin } from "@/services/AuthServices";
import { ToastContainer, toast, Bounce } from "react-toastify";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState<LoginData>({ email: "", password: "" });
  const [errors, setErrors] = useState<Partial<LoginData>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state

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

    setLoading(true);

    try {
      const response = await UserLogin(form.email, form.password);

      if (response.success) {
        toast("Login successful!", {
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
          router.push(`${response.user_id}`);
        }, 2000);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false); // Set loading to false after submission is complete
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <ToastContainer />

      {/* Email */}
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

      {/* Password */}
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

      {/* Remember Me & Forgot Account */}
      <div className="flex justify-between items-center text-sm sm:text-base text-black">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            className="h-4 w-4 accent-black border-gray-300"
          />
          <span>Remember Me</span>
        </label>
        <Link
          href="/login/recover-account"
          className="text-black underline hover:text-gray-700"
        >
          Forgot Account?
        </Link>
      </div>

      {/* Submit */}
      <BaseButton
        type="submit"
        color="black"
        textColor="white"
        width="100%"
        loading={loading}
      >
        LOGIN
      </BaseButton>
    </form>
  );
}
