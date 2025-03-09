import StatisticsInfo from "@/components/StatisticsInfoComponent"; // Ensure the path is correct

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <StatisticsInfo wikiContributions={25} totalCasesFinished={10} totalActiveCases={3} />
    </div>
  );
}
