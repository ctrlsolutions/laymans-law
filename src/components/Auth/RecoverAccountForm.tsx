"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BaseButton from "@/components/Global/BaseButton";
import BaseFormInput from "@/components/Global/BaseFormInput";
import { validateField } from "@/utils/AuthValidators";
import { handleInputChange, handleInputBlur } from "@/utils/AuthUtils";
import { ToastContainer, toast, Bounce } from "react-toastify";

export default function RecoverAccountForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmail(value);
    setError(validateField("email", value, { email: value }));
  };

  const handleBlur = () => {
    setError(validateField("email", email, { email }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailError = validateField("email", email, { email });
    setError(emailError);

    if (emailError) return;

    // Simulated response or replace with actual service call
    toast("Recovery email sent if the account exists.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      transition: Bounce,
    });

    // Optional redirect after delay
    setTimeout(() => {
      router.push("/auth/login");
    }, 3000);
  };

  return (
 <form
  onSubmit={handleSubmit}
  className="flex flex-col h-full w-full"
>
  <ToastContainer />

  {/* Top input section */}
  <div>
    <BaseFormInput
      label="Email"
      name="email"
      type="email"
      value={email}
      onBlur={handleBlur}
      onChange={handleChange}
      icon="email"
      color="black"
      width="100%"
    />
    {error && <p className="text-gray-500">{error}</p>}
  </div>

  {/* Bottom button section */}
  <div className="flex flex-row justify-end items-end gap-4 space-y-4 ">
    <BaseButton
      type="button"
      color="gray-300"
      textColor="black"
      width="25%"
      onClick={() => router.push("/login")}
    >
      Cancel
    </BaseButton>
    <BaseButton
      type="button"
      color="black"
      textColor="white"
      width="25%"
      onClick={() => router.push("/login/recover-account/security-code")}
    >
      Search
    </BaseButton>
  </div>
</form>

  );
}
