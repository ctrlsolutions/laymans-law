export const validateField = (
  name: string,
  value: string,
  form: Record<string, unknown>
): string => {
  const trimmedValue = value.trim();

  if (name === "email") {
    if (!trimmedValue) {
      return "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) {
      return "Invalid email format.";
    }
    return "";
  }

  if (name === "password") {
    if (!trimmedValue) {
      return "Password is required.";
    } else if (trimmedValue.length < 8) {
      return "Password must be at least 8 characters.";
    }
    return "";
  }

  if (name === "confirm_password") {
    return trimmedValue !== form.password ? "Passwords do not match" : "";
  }

  return "";
};
