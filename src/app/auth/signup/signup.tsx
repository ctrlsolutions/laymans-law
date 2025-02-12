import { User, Mail, Hash, Eye, Calendar } from "react-feather";
import BaseFormInput from "@/components/Global/BaseFormInput";
import BaseButton from "@/components/BaseButton";
import { useState } from "react";

export default function Signup() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    gender: "",
    dob: "",
    password: "",
    retypePassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    passwordMatch: "",
  });

  const [agree, setAgree] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [event.target.id]: event.target.value });

    if (event.target.id === "email") {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      setErrors({
        ...errors,
        email: emailPattern.test(event.target.value) ? "" : "Invalid email format",
      });
    }
    if (event.target.id === "retypePassword") {
      setErrors({
        ...errors,
        passwordMatch: form.password === event.target.value ? "" : "Passwords do not match",
      });
    }
  };

  return (
    <div className="p-4 text-red max-w-md mx-auto">
      <h2 className="text-3xl font-extrabold text-center text-red-800">Create an account</h2>

      <div className="grid grid-cols-2 gap-6 mb-2">
        <BaseFormInput label="First Name" id="firstName" type="text" icon={User} value={form.firstName} onChange={handleChange} />
        <BaseFormInput label="Last Name" id="lastName" type="text" icon={User} value={form.lastName} onChange={handleChange} />
      </div>

      <BaseFormInput label="Email" id="email" type="email" icon={Mail} value={form.email} onChange={handleChange} />
      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

      <BaseFormInput label="Contact No." id="contact" type="tel" icon={Hash} value={form.contact} onChange={handleChange} />

      <div className="grid grid-cols-2 gap-6 mb-2">
        <BaseFormInput label="Gender" id="gender" type="select" options={["Male", "Female", "Other"]} value={form.gender} onChange={handleChange} />
        <BaseFormInput label="Date of Birth" id="dob" type="date" icon={Calendar} value={form.dob} onChange={handleChange} />
      </div>

      <BaseFormInput label="Password" id="password" type="password" icon={Eye} value={form.password} onChange={handleChange} />
      <BaseFormInput label="Re-Type Password" id="retypePassword" type="password" icon={Eye} value={form.retypePassword} onChange={handleChange} />
      {errors.passwordMatch && <p className="text-red-500 text-sm">{errors.passwordMatch}</p>}

      <div className="flex items-center mb-6 mt-6">
        <input type="checkbox" id="terms" className="mr-2" checked={agree} onChange={() => setAgree(!agree)} />
        <label htmlFor="terms" className="text-sm text-red-700">
          I agree with the <span className="font-bold underline">Terms & Conditions</span>
        </label>
      </div>

      <div className="flex justify-center mb-4 text-white">
        <BaseButton text="CREATE ACCOUNT" color="red" />
      </div>

      <p className="text-center text-sm text-red-700">
        Already have an account? <span className="font-bold underline cursor-pointer">Login</span>
      </p>
    </div>
  );
}
