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
        <div className="w-[500px] h-[323px] bg-white rounded-2xl shadow-lg p-6 border border-gray-300">
            <h2 className="pl-[1rem] pt-[.5rem] text-2xl font-bold flex items-center">
                <img src="/StatisticsLogo.png" alt="Statistics Logo" className="w-6 h-6 mr-2" />
                Statistics:
            </h2>
            <div className="mt-[1rem] pl-[1rem] space-y-2">
                <div className="space-y-[-.5rem]">
                    <p className="text-4xl font-bold text-purple-900">{wikiContributions}</p>
                    <p className="text-lg font-semibold">Wiki Contributions</p>
                </div>
                <div className="space-y-[-.5rem]">
                    <p className="text-4xl font-bold text-purple-900">{totalCasesFinished}</p>
                    <p className="text-lg font-semibold">Total Cases Finished</p>
                </div>
                <div className="space-y-[-.5rem]">
                    <p className="text-4xl font-bold text-purple-900">{totalActiveCases}</p>
                    <p className="text-lg font-semibold">Total Active Cases</p>
                </div>
            </div>
        </div>
    );
};

export default StatisticsInfoComponent;
