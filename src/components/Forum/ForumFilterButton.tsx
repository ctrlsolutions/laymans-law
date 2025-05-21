import { IoMdCheckmark } from "react-icons/io";
import { CaseFilterButtonProps } from "@/interface/CaseTypes";

const iconMap: Record<string, string> = {
  forum: "https://cdn-icons-png.flaticon.com/512/25/25694.png",
  favorite: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
  default: "https://cdn-icons-png.flaticon.com/512/565/565547.png",
};

export const ForumFilterButton: React.FC<CaseFilterButtonProps> = ({
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
        src={iconMap[label.toLowerCase()] || iconMap.default}
        alt={`${label} icon`}
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
