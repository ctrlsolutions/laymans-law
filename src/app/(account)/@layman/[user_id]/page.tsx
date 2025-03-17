"use client";
export default function ProfileLayout({
    details,
    notifications,
    submitted_cases,
}: {
    lawyer: React.ReactNode;
    layman: React.ReactNode;
    details: React.ReactNode;
    notifications: React.ReactNode;
    submitted_cases: React.ReactNode;
}) {
  return (
    <>
        {details}
        {notifications}
        {submitted_cases}
    </>
  );
}
