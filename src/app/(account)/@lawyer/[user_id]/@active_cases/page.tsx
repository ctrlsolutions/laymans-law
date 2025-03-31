"use client";
import ActiveCasesComponent from "@/components/Profile/ActiveCasesComponent";
import ActiveCasesContainer from "@/components/Profile/ActiveCasesContainer";
import Card from "@/components/Profile/Card";

export default function LawyerActiveCases() {
    return (
      <>
        <Card className="h-[53vh]">
          <ActiveCasesContainer count={5}>
            <ActiveCasesComponent />
          </ActiveCasesContainer>
        </Card>
      </>
    );
  }
  
