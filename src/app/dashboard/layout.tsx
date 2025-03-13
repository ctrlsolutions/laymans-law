// this wraps everything under dashboard
"use client";
import Link from "next/link";
import { useState } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {

    //handle active tab highlight
    const tabs = ['Home', 'Case', 'Forum', 'Wiki', 'Account', 'Settings'];
    const[ activeTab, setTab ] = useState('Account'); // get default from url
    const onNavClick = (tab: string) => {
        setTab(tab);
    }


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
            {tabs.map((tab, index) => (
              <Link 
                href={`/dashboard/${tab.toLowerCase()}`}
                key={index}
                className={`w-full h-[5vh] p-5 hover:underline flex items-center justify-center ml-2 rounded-l-3xl ${activeTab === tab ? 'bg-white text-black' : 'bg-blue/30 text-white'}`}
                onClick={() => onNavClick(tab)}
              >
                {tab}
              </Link>
            ))}
          </div>
          <button className=""> Logout</button>
        </div>
        <div className="h-[95vh] w-[90vw] bg-white p-10 pt-5 rounded-xl z-10 ml-[23vw] mr-[20px] border-none">{children}</div>
      </div>
    );
  };
  
  export default Layout;