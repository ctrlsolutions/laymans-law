"use client";

import { useState } from "react";
import InformationComponent from "@/components/Profile/InformationComponent";
import NotificationComponent from "@/components/Profile/NotificationComponent";
import NotificationContainer from "@/components/Profile/NotificationContainer";
import NotificationModal from "@/components/Profile/NotificationModal";
import StatisticsComponent from "@/components/Profile/StatisticsComponent";
import Card from "@/components/Profile/Card";
import ActiveCasesContainer from "@/components/Profile/ActiveCasesContainer";
import ActiveCasesComponent from "@/components/Profile/ActiveCasesComponent";

const userData = {
    name: "LeBron James",
    avatar: '/DefaultProfile.png',
    role: "Layman",
    address: "Los Angeles, California, USA",
    email: "kingjames@gmail.com",
    phone: "09615727576",
    gender: "Male",
    birthdate: "December 12, 2003",
};

const notifications = [
    {
        id: 1,
        title: "New Message",
        timeAgo: "2 hours ago",
        description: "You have received a new message from your lawyer. It contains details about your upcoming court session.  New documents have been submitted for your review. Please review it as soon as possible.  New documents are okay. ",
        category: "Message"
    },
    {
        id: 2,
        title: "Case Update",
        timeAgo: "5 hours ago",
        description: "Your divorce case status has been updated. New documents have been submitted for your review. Please check your inbox.",
        category: "Update"
    },
    {
        id: 3,
        title: "Reminder",
        timeAgo: "1 day ago",
        description: "Your next hearing is scheduled for tomorrow at 9:00 AM. Make sure to bring all necessary documents. Set a reminder to avoid missing it.",
        category: "Reminder"
    },
    {
        id: 4,
        title: "Payment Confirmation",
        timeAgo: "3 days ago",
        description: "Your recent payment for legal services was successfully processed. You can view the receipt in your billing section. Thank you for your prompt payment.",
        category: "Payment"
    },
    {
        id: 5,
        title: "Document Review",
        timeAgo: "4 days ago",
        description: "A new legal document requires your review and signature. It contains important information regarding your case. Please sign it promptly.",
        category: "Document"
    },
    {
        id: 6,
        title: "Court Schedule Change",
        timeAgo: "1 week ago",
        description: "The schedule for your upcoming court appearance has been modified. Verify the new date and time. Contact your lawyer for further details.",
        category: "Schedule"
    }
];

const cases = [
    { 
        id: 1, 
        caseTitle: "Legal Separation", 
        timeAgo: "2 hours ago", 
        description: "A married couple is seeking legal separation due to irreconcilable differences. The petitioner claims emotional and physical neglect, while the respondent denies the allegations. The court is set to hear both parties next week.", 
        category: "Civil", 
        link: "/cases/1" 
    },
    { 
        id: 2, 
        caseTitle: "Divorce", 
        timeAgo: "5 hours ago", 
        description: "A spouse filed for divorce citing infidelity and emotional abuse. The case involves disputes over child custody and asset division. Mediation attempts have failed, escalating the case to court.", 
        category: "Family", 
        link: "/cases/2" 
    }
];

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="grid grid-cols-[40%_1fr] grid-row-2 gap-3 h-[90vh]">

                {/* Left Section */}
                <div className="row-span-1 flex flex-col gap-3">
                    <InformationComponent userData={userData} />
                    <StatisticsComponent />
                </div>

                {/* Right Section */}
                <div className="row-span-1 flex flex-col gap-3">

                    {/* Notifications Section */}
                    <Card className="w-[42.5vw] h-[34vh] overflow-hidden">
                        {/* Make the whole container clickable */}
                        <div 
                            className="w-full h-full cursor-pointer"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <NotificationContainer count={notifications.length}>
                                <div className="overflow-y-hidden overflow-x-hidden max-h-[23vh] pr-[1.5rem]">
                                    {notifications.map((notification) => (
                                        <NotificationComponent 
                                            key={notification.id} 
                                            notification={notification} 
                                        />
                                    ))}
                                </div>
                            </NotificationContainer>
                        </div>
                    </Card>

                    {/* Active Cases Section */}
                    <Card className="w-[42.5vw] h-[55.75vh] overflow-hidden">
                        <ActiveCasesContainer count={cases.length}>
                            <div className="overflow-y-auto max-h-[45vh] pr-2">
                                {cases.map((item) => (
                                    <ActiveCasesComponent 
                                        key={item.id} 
                                        caseItem={item} 
                                    />
                                ))}
                            </div>
                        </ActiveCasesContainer>
                    </Card>
                </div>
            </div>

            {/* Render Notification Modal */}
            {isModalOpen && (
                <NotificationModal 
                    notifications={notifications} 
                    onClose={() => setIsModalOpen(false)} 
                />
            )}
        </>
    );
    
}

export default Home;