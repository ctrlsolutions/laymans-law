const ComingSoon = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[75vh] text-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">Coming Soon</h1>
      <p className="text-lg text-gray-600">
        We&apos;re working on something amazing!
      </p>
      <div className="flex space-x-2 ">
        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></span>
        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-300"></span>
      </div>
    </div>
  );
};

export default ComingSoon;
