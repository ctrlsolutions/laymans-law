"use client";
import StatisticsContainer from "@/components/Profile/StatisticsContainer";
import StatisticsInfoComponent from "@/components/Profile/StatisticsComponent";
import Card from "@/components/Profile/Card";

export default function LawyerStats() {
    return (
      <>
        <Card>
          <StatisticsContainer>
            <StatisticsInfoComponent />
          </StatisticsContainer>
        </Card>
      </>
    );
  }
  
