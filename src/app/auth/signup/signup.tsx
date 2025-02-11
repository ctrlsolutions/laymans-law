import { User, Mail, Hash, Eye, Calendar } from "react-feather";
import BaseFormInput from "@/components/Global/BaseFormInput";
import BaseButton from "@/components/BaseButton";
import { useState } from "react";

// const dropDownOptions = [
//   {labe: "Option 1", value: "option1"},
//   {labe: "Option 2", value: "option2"},
//   {labe: "Option 3", value: "option3"},
// ];

export default function Signup() {
  const [agree, setAgree] = useState(false);

  return (
    <div className="p-4 text-red max-w-md mx-auto">
      <h2 className="text-3xl font-extrabold text-center text-red-800">Create an account</h2>
      
      <div className="grid grid-cols-2 gap-6 mb-2">
        <BaseFormInput label="First Name" id="firstName" type="text" icon={User} class="text-red-700" />
        <BaseFormInput label="Last Name" id="lastName" type="text" icon={User} class="text-red-700" />
      </div>
      
      <BaseFormInput label="Email" id="email" type="email" icon={Mail} class="text-red-700 mb-4" />
      <BaseFormInput label="Contact No." id="contact" type="tel" icon={Hash} class="text-red-700 mb-4" />
      
      <div className="grid grid-cols-2 gap-6 mb-2">
        <BaseFormInput label="Gender" id="gender" type="text" class="text-red-700" />
        <BaseFormInput label="Date of Birth" id="dob" type="date" icon={Calendar} class="text-white" />
      </div>
      
      <BaseFormInput label="Password" id="password" type="password" icon={Eye} class="text-red-700 mb-4" />
      <BaseFormInput label="Re-Type Password" id="retypePassword" type="password" icon={Eye} class="text-red-700 mb-4" />
      
      <div className="flex items-center mb-6 mt-6">
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
      
      <div className="flex justify-center mb-4 text-white">
        <BaseButton text="CREATE ACCOUNT" color="red" />
      </div>
      
      <p className="text-center text-sm text-red-700">
        Already have an account? <span className="font-bold underline cursor-pointer">Login</span>
      </p>
    </div>
  );
}