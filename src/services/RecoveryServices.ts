export async function SendRecoveryCode(email: string) {
    try {
      const res = await fetch("/api/auth/send-recovery-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
  
      const data = await res.json();
      return data;
    } catch {
      return {
        success: false,
        message: "Something went wrong. Please try again.",
      };
    }
  }
  