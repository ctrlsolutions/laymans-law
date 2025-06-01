"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import BaseButton from "@/components/Global/BaseButton";
import BaseFormInput from "@/components/Global/BaseFormInput";
import { ToastContainer, toast } from "react-toastify";
import { SendRecoveryCode } from "@/services/RecoveryServices";

export default function RecoverAccountForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [cooldown, setCooldown] = useState<number>(0);

  // ⏱️ Timer countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [cooldown]);

  const handleSendCode = async () => {
    if (!email) {
      toast.error("Please enter your email first.");
      return;
    }

    const res = await SendRecoveryCode(email);

    if (res.success) {
      toast.success("Recovery code sent successfully!");
      setCooldown(59); // start countdown
    } else {
      toast.error(res.message || "Failed to send recovery code.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!code) {
      toast.error("Please enter the recovery code.");
      return;
    }

    // Optionally, you can verify the code here by calling an API before redirecting

    toast.success("Code verified! Redirecting...");
    
    setTimeout(() => {
      router.push("/login/recover-account/change-password");
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full mb-7">
      <ToastContainer />

      {/* Email Input with paper plane icon */}
      <BaseFormInput
        label="Email"
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        icon="paperPlane"
        onIconClick={() => {
          if (cooldown === 0) handleSendCode();
        }}
        color="black"
        width="100%"
      />

      {/* Recovery Code Input */}
      <BaseFormInput
        label="Recovery Code"
        name="code"
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        color="black"
        width="100%"
      />

      {/* Submit Button */}
      <BaseButton type="submit" color="black" textColor="white" width="100%">
        VERIFY CODE
      </BaseButton>

      {/* Resend Message */}
      <div className="text-center text-sm mt-2 text-gray-700">
        Didn&apos;t receive a code?{" "}
        {cooldown === 0 ? (
          <span
            className="font-bold text-black cursor-pointer underline"
            onClick={handleSendCode}
          >
            Resend code
          </span>
        ) : (
          <span>
            <span className="font-bold text-black">Resend code</span> in {cooldown}s...
          </span>
        )}
      </div>
    </form>
  );
}