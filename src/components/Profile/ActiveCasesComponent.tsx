"use client";

interface CaseItemProps {
    caseItem?: {    // Made `caseItem` optional
        id: number;
        caseTitle: string;
        timeAgo: string;
        description: string;
        category: string;
        link: string;
    };
}

const ActiveCasesComponent: React.FC<CaseItemProps> = ({ caseItem }) => {
    if (!caseItem) {
        console.warn("Missing caseItem prop");  // Debugging hint
    }

    return (
        <div className="h-[10vh] bg-[#FBFBFB] shadow-md rounded-3xl m-2 p-6 flex items-center justify-between">
            
            {/* Case Details */}
            <div className="flex-1 ml-4">
                <h2 className="font-bold">{caseItem?.caseTitle || "N/A"}</h2>
                <p className="text-sm">{caseItem?.timeAgo || "N/A"}</p>
                <p className="text-sm">{caseItem?.description || "No description available"}</p>
            </div>

            {/* Category */}
            <p className="text-sm text-gray-500">{caseItem?.category || "Uncategorized"}</p>
        </div>
    );
};

export default ActiveCasesComponent;
