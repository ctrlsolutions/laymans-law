interface StatisticsInfoComponentProps {
    wikiContributions?: number;
    totalCasesFinished?: number;
    totalActiveCases?: number;
}

const StatisticsInfoComponent: React.FC<StatisticsInfoComponentProps> = ({
    wikiContributions = 0,
    totalCasesFinished = 0,
    totalActiveCases = 0,
}) => {
    return (
        <div className="w-full pt-[3rem] pl-[3rem] bg-white shadow-lg rounded-3xl p-8 border flex flex-col items-start">
            <h2 className="w-full text-2xl font-bold flex items-start justify-start mb-4">
                <img src="/StatisticsLogo.png" alt="Statistics Logo" className="w-8 h-8 mr-2" />
                Statistics
            </h2>
            <div className="w-full flex flex-col items-start text-start space-y-1">
                <div className="w-full">
                    <p className="text-2xl font-bold text-purple-900">{wikiContributions}</p>
                    <p className="text-lg font-semibold">Wiki Contributions</p>
                </div>
                <div className="w-full">
                    <p className="text-2xl font-bold text-purple-900">{totalCasesFinished}</p>
                    <p className="text-lg font-semibold">Total Cases Finished</p>
                </div>
                <div className="w-full">
                    <p className="text-2xl font-bold text-purple-900">{totalActiveCases}</p>
                    <p className="text-lg font-semibold">Total Active Cases</p>
                </div>
            </div>
        </div>
    );
};

export default StatisticsInfoComponent;
