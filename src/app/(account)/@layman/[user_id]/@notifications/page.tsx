"use client";
import NotificationComponent from "@/components/Profile/NotificationComponent";
import NotificationContainer from "@/components/Profile/NotificationContainer";
import Card from "@/components/Profile/Card";

export default function LaymanNotifs() {
    return (
      <>
        <Card>
          <NotificationContainer count={5} color="red">
            <NotificationComponent notification={{
              id: 1,
              title: "New Case Update",
              username: "@user123",
              description: "Your case has been updated with new information",
              timeAgo: "2 hours ago",
              category: "Case Updates"
            }} />
          </NotificationContainer>
        </Card>
      </>
    );
  }
  
