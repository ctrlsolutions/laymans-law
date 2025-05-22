"use client";
import NotificationComponent from "@/components/Profile/NotificationComponent";
import NotificationContainer from "@/components/Profile/NotificationContainer";
import Card from "@/components/Profile/Card";

export default function LawyerNotifs() {
    return (
      <>
        <Card>
          <NotificationContainer count={5}>
            <NotificationComponent notification={{
              id: 1,
              title: "New Case Assignment",
              username: "@client456",
              description: "You have been assigned a new case",
              timeAgo: "1 hour ago",
              category: "Case Assignments"
            }} />
          </NotificationContainer>
        </Card>
      </>
    );
  }
  
