"use client";

interface CaseItemProps {
    caseItem: {
        id: number;
        caseTitle: string;
        timeAgo: string;
        description: string;
        category: string;
        profileImage?: string;  // Optional image
        link: string;
    };
}

const ActiveCasesComponent: React.FC<CaseItemProps> = ({ caseItem }) => {
    return (
        <div className="h-[10vh] bg-[#FBFBFB] shadow-md rounded-3xl m-2 p-6 flex items-center justify-between">
            
            {/* Profile Image with Default Fallback */}
            <img 
                src={caseItem.profileImage || "/DefaultProfile.png"} 
                alt="Profile" 
                className="w-14 h-14 rounded-full" 
            />
            
            {/* Case Details */}
            <div className="flex-1 ml-4">
                <h2 className="font-bold">{caseItem.caseTitle}</h2>
                <p className="text-sm">{caseItem.timeAgo}</p>
                <p className="text-sm">{caseItem.description}</p>
            </div>

            {/* Category */}
            <p className="text-sm text-gray-500">{caseItem.category}</p>
        </div>
    );
};

export default ActiveCasesComponent;
