"use client";
import { useState } from "react";
import SignupForm from "../../../../components/Auth/SignUpForm";
import Container from "@/components/Auth/AuthContainer";

export default function Home() {
  return (
    <Container bgColor="blue">
      <div className="flex items-center justify-center h-full">
        <SignupForm fontColor="blue" />
      </div>
    </Container>
  );
}
