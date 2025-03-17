"use client";
import NotificationContainer from "@/components/Profile/NotificationContainer";
import NotificationComponent from "@/components/Profile/NotificationComponent";

export default function Home() {
  console.log("Home component rendered");

  return (
    <>
      <NotificationContainer count={142}>
          <NotificationComponent />
      </NotificationContainer>
    </>
  );
}
