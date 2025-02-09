export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex h-screen items-center justify-center bg-red-100 bg-cover bg-center"
      style={{ backgroundImage: "url(/BG.png)" }}
    >
      <div className="flex w-1/2 bg-black max-w-md p-6 rounded-3xl opacity-50 h-3/4 z-0">
        LOGO
      </div>
      <div className="flex items-center justify-center w-1/2 bg-gray-50 h-4/5 rounded-3xl -m-32 z-10">
        {children}
      </div>
    </div>
  );
}
