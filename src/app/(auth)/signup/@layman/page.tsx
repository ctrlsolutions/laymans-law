"use client";
import SignupForm from "@/components/Auth/SignUpForm";
import Container from "@/components/Auth/AuthContainer";

export default function Home() {
  return (
    <Container bgColor="red" className="animate-bounce-to-center">
      <div className="flex items-center justify-center h-full">
        <SignupForm userType="layman" />
      </div>
    </Container>
  );
}
