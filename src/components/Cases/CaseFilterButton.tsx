import { IoMdCheckmark } from "react-icons/io";

interface CaseFilterButtonProps {
  caseType: string;
  selectedCaseType: string;
  setSelectedCaseType: (caseType: string) => void;
  label: string;
}

export const CaseFilterButton: React.FC<CaseFilterButtonProps> = ({
  caseType,
  selectedCaseType,
  setSelectedCaseType,
  label,
}) => {
  const isSelected = selectedCaseType === caseType;

  return (
    <button
      onClick={() => setSelectedCaseType(caseType)}
      className={`flex gap-1 mt-1.5 items-center hover:underline ${
        isSelected ? "text-[#0838E5] font-bold" : "text-black"
      }`}
    >
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/89e03529fdda8df1e9cb5db7f312b9b67dd7af7e?placeholderIfAbsent=true&apiKey=b97adb845ad745fdabf283f95e3c166e"
        alt=""
        className="w-[40px]"
        aria-hidden="true"
      />
      <span className="font-bold">{label}</span>
      {isSelected && (
        <IoMdCheckmark className="ml-auto text-blue-600 text-xl" />
      )}
    </button>
  );
};
