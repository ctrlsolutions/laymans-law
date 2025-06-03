"use client";
import Card from "@/components/Profile/Card";
import ActiveCasesContainer from "@/components/Profile/ActiveCasesContainer";

export default function LaymanSubmittedCases() {
  return (
    <>
      <Card className="h-[87vh]">
        <ActiveCasesContainer />
      </Card>
    </>
  );
}
