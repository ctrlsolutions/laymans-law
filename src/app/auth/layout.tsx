const Layout = () => {
    return (
      <div
        className="flex h-screen items-center justify-center bg-cover bg-center relative"
        style={{ backgroundImage: `url("/auth_bg.png")` }}
      >
        {/* Sidebar */}
        <div className="absolute left-[30vw] w-1/3 bg-black p-6 flex items-center justify-center">
          <img src="/logo.png" alt="Logo" className="max-w-full h-auto" />
        </div>
  
        {/* Main Content */}
        <div className="absolute left w-2/3 bg-white p-8 rounded-xl shadow-lg"></div>
      </div>
    );
  };
  
  export default Layout;
  