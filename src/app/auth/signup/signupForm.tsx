import { useState, useEffect } from "react";
import { User, Mail, Hash, Eye, Calendar } from "react-feather";
import BaseFormInput from "@/components/Global/BaseFormInput";
import { useRouter } from "next/navigation";

export default function signupForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    gender: "",
    dob: "",
    password: "",
    retypePassword: "",
    userType: "", 
    rollNumber: "",
    rollSignedDate: ""
  });

  const [errors, setErrors] = useState({
    email: "",
    passwordMatch: "",
  });

  const [agree, setAgree] = useState(false);

  useEffect(() => {
    if (router.query && router.query.userType) {
      setForm(prevForm => ({
        ...prevForm,
        userType: router.query.userType as string
      }));
    }
  }, [router.query]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [event.target.id]: event.target.value });

    if (event.target.id === "email") {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@up\.edu\.ph$/;
      setErrors({
        ...errors,
        email: emailPattern.test(event.target.value) ? "" : "Invalid email.",
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
    <div className="p-4 text-blue max-w-md mx-auto h-full flex flex-col">
      <h2 className="text-3xl font-extrabold text-center">Create an account</h2>

      <div className="overflow-y-auto p-4 ">
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

        {form.userType === "Lawyer" && (
          <>
            <BaseFormInput label="Roll Number" id="rollNumber" type="text" value={form.rollNumber} onChange={handleChange} />
            <BaseFormInput label="Roll Signed Date" id="rollSignedDate" type="date" value={form.rollSignedDate} onChange={handleChange} />
          </>
        )}

        <BaseFormInput label="Password" id="password" type="password" icon={Eye} value={form.password} onChange={handleChange} />
        <BaseFormInput label="Re-Type Password" id="retypePassword" type="password" icon={Eye} value={form.retypePassword} onChange={handleChange} />
        {errors.passwordMatch && <p className="text-red-500 text-sm">{errors.passwordMatch}</p>}
      </div>

      <div className="flex flex-col justify-between m-4">
        <div className="flex items-center mb-2">
          <input type="checkbox" id="terms" className="mr-2" checked={agree} onChange={() => setAgree(!agree)} />
          <label htmlFor="terms" className="text-sm text-red-700">
            I agree with the <span className="font-bold underline">Terms & Conditions</span>
          </label>
        </div>

        <button className="bg-red text-white font-semibold py-3 px-6 rounded-lg shadow-md self-center w-[100%] mb-2">
          CREATE ACCOUNT
        </button>

        <p className="text-center text-sm text-red-700">
          Already have an account? <span className="font-bold underline cursor-pointer" onClick={() => router.push("/auth/login")}>Login</span>
        </p>
      </div>
    </div>
  );
}
