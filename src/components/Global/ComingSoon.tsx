const ComingSoon = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">Coming Soon</h1>
      <p className="text-lg text-gray-600 mt-2">
        We're working on something amazing!
      </p>
      <div className="flex space-x-2 mt-4">
        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></span>
        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-300"></span>
      </div>
    </div>
  );
};

export default ComingSoon;
