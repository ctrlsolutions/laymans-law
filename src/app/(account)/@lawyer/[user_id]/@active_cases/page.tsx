"use client";
import Card from "@/components/Profile/Card";
import ActiveCasesContainer from "@/components/Profile/ActiveCasesContainer";

export default function LawyerActiveCases() {
  return (
    <>
      <Card className="h-[53vh]">
        <ActiveCasesContainer />
      </Card>
    </>
  );
}
