import LawyerInfoComponent from "@/components/LawyerInfoComponent";
import LawyerNotificationsComponent from "@/components/LawyerNotificationsComponent";
import LawyerActiveCases from "@/components/LawyerActiveCases";
import LawyerStatisticsComponent from "@/components/LawyerStatisticsComponent";

export default function HomePage() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gray-100">
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 row-start-2 w-full max-w-6xl">
        <div className="">
          <LawyerInfoComponent />
        </div>
        <div className="">
          <LawyerNotificationsComponent />
        </div>
        <div className="">
          <LawyerStatisticsComponent />
        </div>
        <div className="">
          <LawyerActiveCases /> 
        </div>
      </main>
    </div>
  );
}
