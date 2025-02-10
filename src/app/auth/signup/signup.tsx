import { User, Mail, Hash, Eye, Calendar } from "react-feather";
import BaseFormInput from "@/components/Global/BaseFormInput";
import BaseButton from "@/components/BaseButton";
import { useState } from "react";

export default function Signup() {
  const [agree, setAgree] = useState(false);

  return (
    <div className="p-6 text-red">
      <h2 className="text-2xl font-bold text-center text-red-800">Create an account</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <BaseFormInput label="First Name" id="firstName" type="text" icon={User} className="text-red-700" />
        <BaseFormInput label="Last Name" id="lastName" type="text" icon={User} className="text-red-700" />
      </div>
      
      <BaseFormInput label="Email" id="email" type="email" icon={Mail} className="text-red-700" />
      <BaseFormInput label="Contact No." id="contact" type="tel" icon={Hash} className="text-red-700" />
      
      <div className="grid grid-cols-2 gap-4">
        <BaseFormInput label="Gender" id="gender" type="text" className="text-red-700" />
        <BaseFormInput label="Date of Birth" id="dob" type="date" icon={Calendar} className="text-red-700" />
      </div>
      
      <BaseFormInput label="Password" id="password" type="password" icon={Eye} className="text-red-700" />
      <BaseFormInput label="Re-Type Password" id="retypePassword" type="password" icon={Eye} className="text-red-700" />
      
      <div className="flex items-center mt-4">
        <input 
          type="checkbox" 
          id="terms" 
          className="mr-2"
          checked={agree} 
          onChange={() => setAgree(!agree)}
        />
        <label htmlFor="terms" className="text-sm text-red-700">
          I agree with the <span className="font-bold underline">Terms & Conditions</span>
        </label>
      </div>
      
      <div className="mt-6 flex justify-center">
        <BaseButton text="CREATE ACCOUNT" color="red" />
      </div>
      
      <p className="text-center text-sm text-red-700 mt-4">
        Already have an account? <span className="font-bold underline cursor-pointer">Login</span>
      </p>
    </div>
  );
}
