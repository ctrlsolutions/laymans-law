// this wraps everything under dashboard

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
      <div
        className="flex h-screen items-center bg-cover bg-center relative"
        style={{ backgroundImage: `url("/bg_blue.png")` }}
      >
        {/* Sidebar */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-[88vh] w-[320px] bg-blue/30 ml-8 p-6 rounded-3xl">
          this is nav
        </div>
        <div className="h-[95vh] w-[90vw] bg-white p-10 pt-5 rounded-xl shadow-lg z-10 ml-[350px] mr-[20px]">{children}</div>
      </div>
    );
  };
  
  export default Layout;