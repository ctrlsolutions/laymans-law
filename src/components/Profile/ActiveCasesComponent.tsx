"use client";

interface CaseItemProps {
    caseItem?: {
        id: number;
        caseTitle: string;
        username?: string;
        timeAgo: string;
        description: string;
        category: string;
        link: string;
    };
}

const ActiveCasesComponent: React.FC<CaseItemProps> = ({ caseItem }) => {
    if (!caseItem) {
        console.warn("Missing caseItem prop");  
    }

    return (
        <div className="relative h-[20vh] bg-white shadow-[0px_4px_20px_0px_rgba(0,0,0,0.2)] rounded-3xl m-[.5rem] p-8 flex items-center mt-[1.3rem]">
            
            {/* Category in the upper right */}
            <div className="absolute -top-3 right-8 flex items-center gap-2 bg-white border border-gray-300 px-3 py-1 text-sm rounded-lg shadow-md">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                {caseItem?.category || "Uncategorized"}
            </div>

            {/* Case Details */}
            <div className="flex-1 ml-[.750rem] mr-[1.9rem]">
                <h2 className="text-lg font-extrabold text-purple-950">{caseItem?.caseTitle || "No Title"}</h2>
                <div className="text-sm text-gray-500">
                    {caseItem?.username || "@Anonymous"} • {caseItem?.timeAgo || "N/A"} 
                </div>
                <p className="text-sm pt-[.25rem] pl-[.25rem]">{caseItem?.description || "No description available"}</p>
            </div>
        </div>
    );
};

export default ActiveCasesComponent;
