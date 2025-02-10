const Layout = () => {
    return (
      <div
        className="flex h-screen items-center justify-center bg-cover bg-center relative"
        style={{ backgroundImage: `url("/auth_bg.png")` }}
      >
        {/* Sidebar */}
        <div className="absolute left-[15vw] w-1/4 h-[75vh] bg-black/50 p-6 flex items-center justify-left rounded-xl">
          <img src="/logo.png" alt="Logo" className="max-w-full h-auto" />
        </div>
  
        {/* Main Content */}
        <div className="absolute left-[35vw] w-1/2 h-[80vh] bg-white p-8 rounded-xl shadow-lg"></div>
      </div>
    );
  };
  
  export default Layout;
  