"use client";
import NotificationComponent from "@/components/Profile/NotificationComponent";
import NotificationContainer from "@/components/Profile/NotificationContainer";
import Card from "@/components/Profile/Card";

export default function LawyerNotifs() {
    return (
      <>
        <Card>
          <NotificationContainer count={5}>
            <NotificationComponent />
          </NotificationContainer>
        </Card>
      </>
    );
  }
  
