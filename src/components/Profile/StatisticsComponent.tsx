interface StatisticsInfoComponentProps {
    wikiContributions?: number;
    totalCasesFinished?: number;
    totalActiveCases?: number;
}

const StatisticsInfoComponent: React.FC<StatisticsInfoComponentProps> = ({
    wikiContributions = 143,
    totalCasesFinished = 143,
    totalActiveCases = 143,
}) => {
    return (
        <>
            <div className="w-full flex flex-col items-start text-start gap-3">
                <div className="w-full">
                    <p className="text-2xl font-black text-purple-900">{wikiContributions}</p>
                    <p className="text-lg font-bold text-black">Wiki Contributions</p>
                </div>
                <div className="w-full">
                    <p className="text-2xl font-black text-purple-900">{totalCasesFinished}</p>
                    <p className="text-lg font-bold text-black">Total Cases Finished</p>
                </div>
                <div className="w-full">
                    <p className="text-2xl font-black text-purple-900">{totalActiveCases}</p>
                    <p className="text-lg font-bold text-black">Total Active Cases</p>
                </div>
            </div>
        </>
    );
};

export default StatisticsInfoComponent;
