import { useEffect, useState } from "react";
import { getLawyerStatistics } from "@/services/StatisticsServices";
import { LawyerStatisticsData } from "@/interface/AuthTypes";

const LawyerDashboardStats = () => {
  const [stats, setStats] = useState<LawyerStatisticsData | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const response = await getLawyerStatistics();
      if (response.success && response.data) {
        setStats(response.data);
      } else {
        console.error(response.message);
      }
    };

    fetchStats();
  }, []);

  return (
    <>
      <div className="w-full flex flex-col items-start text-start gap-3">
        <div className="w-full">
          <p className="text-xl font-black text-purple-900">
            {stats?.cases_active ?? 0}
          </p>
          <p className="text-base font-bold text-black">Total Cases Active</p>
        </div>
        <div className="w-full">
          <p className="text-xl font-black text-purple-900">
            {stats?.cases_finished ?? 0}
          </p>
          <p className="text-base font-bold text-black">Total Cases Finished</p>
        </div>
      </div>
    </>
  );
};

export default LawyerDashboardStats;
