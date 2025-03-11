// this wraps everything under dashboard
import Link from "next/link";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
      <div
        className="flex h-screen items-center bg-cover bg-center relative"
        style={{ backgroundImage: `url("/bg_blue.png")` }}
      >
        {/* Sidebar */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-[88vh] w-[22vw] bg-blue/30 ml-8 p-6 pl-0 rounded-3xl flex flex-col justify-between">
          <img src="/logo.png" alt="Logo" className="max-w-full h-auto m-3" />
          {/* navlinks */}
          <div className="flex flex-col text-center">
          <Link 
            href="/" 
            className="w-full h-[5vh] p-6 bg-white text-black hover:underline flex items-center justify-center ml-2 rounded-l-3xl"
          >
            Home
          </Link>

            <Link 
              href="/about" 
              className="w-full h-[5vh] p-5 hover:underline flex items-center justify-center ml-2 rounded-l-3xl"
            >
              Case
            </Link>
            <Link 
              href="/about" 
              className="w-full h-[5vh] p-5 hover:underline flex items-center justify-center ml-2 rounded-l-3xl"
            >
              Forum
            </Link>
            <Link 
              href="/about" 
              className="w-full h-[5vh] p-5 hover:underline flex items-center justify-center ml-2 rounded-l-3xl"
            >
              Wiki
            </Link>
            <Link 
              href="/about" 
              className="w-full h-[5vh] p-5 hover:underline flex items-center justify-center ml-2 rounded-l-3xl"
            >
              Account
            </Link>
            <Link 
              href="/about" 
              className="w-full h-[5vh] p-5 hover:underline flex items-center justify-center ml-2 rounded-l-3xl"
            >
              Settings
            </Link>
          </div>
          <button className=""> Logout</button>
        </div>
        <div className="h-[95vh] w-[90vw] bg-white p-10 pt-5 rounded-xl z-10 ml-[23vw] mr-[20px] border-none">{children}</div>
      </div>
    );
  };
  
  export default Layout;