import { useState, useEffect } from "react";
import { User, Mail, Hash, Eye, Calendar } from "react-feather";
import BaseFormInput from "@/components/Global/BaseFormInput";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface props {
  fontColor?: string; 
}

export default function signupForm({fontColor = "black"}: props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const path = usePathname();
  const lastParam = path.split('/').filter(Boolean).pop();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    contact_number: "",
    gender: "",
    birth_date: "",
    password: "",
    confirm_password: "",
    userType: "", 
    rollNumber: "",
    rollSignedDate: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    passwordMatch: "",
  });

  const [agree, setAgree] = useState(false);

  useEffect(() => {
    const userType = searchParams.get("userType");
    if (userType) {
      setForm(prevForm => ({
        ...prevForm,
        userType: userType.toLowerCase() 
      }));
    }
  }, [searchParams]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [event.target.id]: event.target.value });

    if (event.target.id === "email") {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@up\.edu\.ph$/;
      setErrors({
        ...errors,
        email: emailPattern.test(event.target.value) ? "" : "Invalid email.",
      });
    }

    if (event.target.id === "confirm_password") {
      setErrors({
        ...errors,
        passwordMatch: form.password === event.target.value ? "" : "Passwords do not match",
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Submitting form:", form);
    console.log("Birth date before submit:", form.birth_date);


    const filteredForm = Object.fromEntries(
      Object.entries(form).map(([key, value]) => [key, value === "" ? null : value])
    );

    const response = await fetch("http://localhost:8000/api/users/signup/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();
    if(response.ok) {
      alert("Signup successful!");
    } else {
      alert(data.error || "Signup failed");
    }
  }

  return (
    <div className={`p-4 text-${fontColor} max-w-md mx-auto h-full flex flex-col`}>
      <h2 className="text-3xl font-extrabold text-center">Create an account</h2>

      <div className="overflow-y-auto p-4 ">
        <div className="grid grid-cols-2 gap-6 mb-2">
          <BaseFormInput label="First Name" id="first_name" type="text" icon={User} value={form.first_name} onChange={handleChange} />
          <BaseFormInput label="Last Name" id="last_name" type="text" icon={User} value={form.last_name} onChange={handleChange} />
        </div>

        <BaseFormInput label="Email" id="email" type="email" icon={Mail} value={form.email} onChange={handleChange} />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <BaseFormInput label="Contact No." id="contact_number" type="tel" icon={Hash} value={form.contact_number} onChange={handleChange} />

        <div className="grid grid-cols-2 gap-6 mb-2">
          <BaseFormInput label="Gender" id="gender" type="select" options={["M", "F", "Other"]} value={form.gender} onChange={handleChange} />
          <BaseFormInput label="Date of Birth" id="birth_date" type="date" icon={Calendar} value={form.birth_date || ""} onChange={handleChange} />
        </div>

        {lastParam === 'lawyer' && (
          <div className="grid grid-cols-2 gap-6 mb-2">
            <BaseFormInput
              label="Roll No."
              id="roll-no"
              type="text"
              icon={Hash}
              value={form.gender}
              onChange={handleChange}
            />
            <BaseFormInput
              label="Roll Signed Date"
              id="roll-signed-date"
              type="date"
              icon={Calendar}
              value={form.dob}
              onChange={handleChange}
            />
          </div>
        )}

        <BaseFormInput label="Password" id="password" type="password" icon={Eye} value={form.password} onChange={handleChange} />
        <BaseFormInput label="Re-Type Password" id="confirm_password" type="password" icon={Eye} value={form.confirm_password} onChange={handleChange} />
        {errors.passwordMatch && <p className="text-red-500 text-sm">{errors.passwordMatch}</p>}
      </div>

      <div className="flex flex-col justify-between m-4">
        <div className="flex items-center mb-2">
          <input type="checkbox" id="terms" className="mr-2" checked={agree} onChange={() => setAgree(!agree)} />
          <label htmlFor="terms" className="text-sm text-red-700">
            I agree with the <span className="font-bold underline">Terms & Conditions</span>
          </label>
        </div>

        <form onSubmit={handleSubmit}>
          <button className={`bg-${fontColor} text-white font-semibold py-3 px-6 rounded-lg shadow-md self-center w-[100%] mb-2`} type="submit" >
            CREATE ACCOUNT
          </button>
        </form>

        <p className="text-center text-sm text-red-700">
          Already have an account? <span className="font-bold underline cursor-pointer" onClick={() => router.push("/auth/login")}>Login</span>
        </p>
      </div>
    </div>
  );
}
