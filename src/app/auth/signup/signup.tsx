export default function SignupForm() {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-center text-black">Sign up</h1>
          <p className="text-gray-700 font-semibold text-center mb-6">New here? Create a new account below.</p>
  
          <div className="h-[300px] overflow-y-auto">
            <form className="space-y-4">
              <input type="email" placeholder="Email" className="w-full p-3 border border-red-900 rounded-2xl font-medium placeholder-red-900" />
              <input type="password" placeholder="Password" className="w-full p-3 border border-red-900 rounded-2xl font-medium placeholder-red-900" />
              <input type="password" placeholder="Re-enter password" className="w-full p-3 border border-red-900 rounded-2xl font-medium placeholder-red-900" />
              
              <div className="w-full border-b border-red-900"></div>
  
              <div className="flex space-x-2">
                <input type="text" placeholder="First name" className="w-1/2 p-3 border border-red-900 rounded-2xl font-medium placeholder-red-900" />
                <input type="text" placeholder="Middle name" className="w-1/2 p-3 border border-red-900 rounded-2xl font-medium placeholder-red-900" />
              </div>
  
              <input type="text" placeholder="Last name" className="w-full p-3 border border-red-900 rounded-2xl font-medium placeholder-red-900" />
  
              <div className="flex items-center space-x-4 mt-4">
                <label className="text-gray-700 font-semibold">Sex:</label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="sex" className="form-radio border-red-900" />
                  <span className="text-black">Male</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="sex" className="form-radio border-red-900" />
                  <span className="text-black">Female</span>

                </label>
              </div>
  
              <div className="flex flex-col mt-4">
                <label className="text-gray-700 font-semibold">Date of Birth:</label>
                <input type="date" className="w-full p-3 border border-red-900 rounded-2xl font-medium placeholder-black placeholder-opacity-100" />
              </div>
            </form>
          </div>
  
          <div className="flex justify-between mt-4">
            <button type="button" className="w-1/2 bg-black text-white py-3 rounded-2xl mr-2 font-bold">CANCEL</button>
            <button type="submit" className="w-1/2 bg-red-900 text-white py-3 rounded-2xl font-bold">SIGN UP</button>
          </div>
  
          <div className="mt-6 text-center">
            <button className="w-full bg-red-900 text-white py-3 rounded-2xl shadow-md font-bold">Continue with Google</button>
          </div>
        </div>
      </div>
    );
  }
  