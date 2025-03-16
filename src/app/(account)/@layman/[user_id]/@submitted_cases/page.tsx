"use client";
import CaseContainer from "@/components/Profile/CaseContainer";
import CaseComponent from "@/components/Profile/CaseComponent";

export default function Home() {
  return (
    <>
      <CaseContainer count={12}>
        <div className="flex items-center justify-center h-full">
          <CaseComponent />
        </div>
      </CaseContainer>
    </>
    
  );
}
