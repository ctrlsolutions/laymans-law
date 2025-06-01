interface LeftPanelProps {
  selectedChapter: string;
  setSelectedChapter: (chapter: string) => void;
}

export default function LeftPanel({
  selectedChapter,
  setSelectedChapter,
}: LeftPanelProps) {
  return (
    <div className="w-full lg:w-1/3 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto p-4">
      {[1, 2, 3].map((num) => (
        <div
          key={num}
          className={`bg-white rounded-lg shadow p-3 border transition-all duration-200 ${
            selectedChapter === num.toString()
              ? "border-blue-500 ring-2 ring-blue-200 scale-105"
              : "border-gray-200 hover:border-gray-300"
          }`}
          onClick={() => setSelectedChapter(num.toString())}
          role="button"
          tabIndex={0}
          style={{
            transformOrigin: "center",
          }}
        >
          <h3 className="text-sm md:text-xs lg:text-sm font-bold mb-2 ml-2 mt-2">
            R.A. Title of Law of the Philippines
          </h3>
          <p className="text-xs md:text-xs text-gray-600 mb-2 ml-2 mt-2">
            Chapter {num}
          </p>
          <div className="flex text-xs md:text-xs flex-wrap gap-4 justify-between ml-2 mt-2">
            {["Previous", "Review", "Submit"].map((action) => (
              <div
                key={action}
                className="flex items-center gap-1 border border-gray-300 rounded-xl px-2 py-1 bg-gray-100 shadow-sm"
              >
                <div className="w-1 h-1 rounded-full bg-green-500"></div>
                <span className="text-xs md:text-xs">{action}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
