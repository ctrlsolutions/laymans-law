"use client";
import SignupForm from "@/components/Auth/SignUpForm";
import Container from "@/components/Auth/AuthContainer";

export default function Home() {
  return (
    <Container bgColor="blue">
      <div className="flex items-center justify-center h-full">
        <SignupForm userType="lawyer" />
      </div>
    </Container>
  );
}
