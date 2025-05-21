import { ContainerProps } from "@/interface/AuthContainer";

interface AuthContainerProps extends ContainerProps {
  className?: string; // Add className prop
}

const Layout = ({
  children,
  bgColor = "black",
  className = "",
}: AuthContainerProps) => {
  return (
    <div
      className={`flex h-screen items-center justify-center relative ${className}`}
    >
      {/* Logo on Side */}
      <div className="absolute left-[15vw] w-[22vw] h-[75vh] p-6 flex items-center justify-left bg-black/50 rounded-2xl overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ backgroundColor: bgColor, opacity: 0.1 }}
        ></div>
        <img src="/logo.png" alt="Logo" className="max-w-full h-auto" />
      </div>

      {/* Main Content */}
      <div className="absolute left-[35vw] w-[45vw] h-[80vh] bg-white p-8 rounded-xl shadow-lg">
        {children}
      </div>
    </div>
  );
};

export default Layout;
