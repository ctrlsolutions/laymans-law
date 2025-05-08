// this wraps everything under dashboard
"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {

    //handle active tab highlight
    const tabs = {
        HOME: '/home',
        'BROWSE CASE': '/browse-case',
        'ACTIVE CASES': '/active-cases',
        FORUM: '/forum',
        WIKI: '/wiki',
        ACCOUNT: '/account',
        SETTINGS: '/settings',
    };
    const pathname = usePathname();
    const formattab = pathname.split("/")[2]?.charAt(0).toUpperCase() + pathname.split("/")[2]?.slice(1) || "Home";
    const[ activeTab, setTab ] = useState( formattab ); 
    const onNavClick = (tab: string) => {
        setTab(tab);
    }


    return (
      <div
        className="flex h-screen items-center bg-cover bg-center relative"
        style={{ backgroundImage: `url("/bg_blue.png")` }}
      >
        {/* Sidebar */}

        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-[88vh] w-[22vw] bg-blue/30 ml-8 p-6 pl-0 rounded-3xl flex flex-col justify-between font-extrabold">
          <img src="/logo.png" alt="Logo" className="max-w-full h-auto m-10" />
          {/* navlinks */}
          <div className="flex flex-col text-center pb-[10vh] text-[1.1rem] font-black">
              {Object.entries(tabs).map(([key, value]) => (
              <Link 
                href={`/dashboard/${value}`}
                key={key}
                className={`w-full h-[5vh] p-7 hover:text-2xl transition-all duration-350 ease-in-out flex items-center justify-center ml-4 rounded-l-3xl ${activeTab === key ? 'bg-white text-black text-[1.3rem]' : 'bg-blue/30 text-white'}`}
                onClick={() => onNavClick(key)}
              >
                {key}
              </Link>
            ))}
          </div>
          <button className="text-[1.1rem] ml-4"> Logout</button>
        </div>
        <div className="h-[95vh] w-[90vw] bg-white p-0 pt-5 rounded-xl z-10 ml-[23vw] mr-[20px] border-none">{children}</div>
      </div>
    );
  };
  
  export default Layout;