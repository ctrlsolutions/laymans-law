"use client";
import ActiveCasesComponent from "@/components/Profile/ActiveCasesComponent";
import ActiveCasesContainer from "@/components/Profile/ActiveCasesContainer";
import Card from "@/components/Profile/Card";

export default function LaymanNotifs() {
  return (
    <>
      <Card className="h-[87vh]">
        <ActiveCasesContainer count={5} color="red">
          <ActiveCasesComponent
            caseItem={{
              id: 1,
              caseTitle: "Sample Case",
              username: "@user123",
              timeAgo: "2 hours ago",
              description: "This is a sample case description",
              category: "Civil Rights",
              link: "/cases/1",
            }}
          />
        </ActiveCasesContainer>
      </Card>
    </>
  );
}
