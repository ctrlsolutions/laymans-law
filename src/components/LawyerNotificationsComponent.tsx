"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

interface Notification {
  id: number;
  username: string;
  timeAgo: string;
  content: string;
  category: string;
  profileImage: string;
  link: string;
}

const LawyerNotificationsComponent = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Simulate fetching notifications from the backend (Replace this with API call later)
    const fetchedNotifications: Notification[] = [
      {
        id: 1,
        username: "@chimichangas",
        timeAgo: "30 minutes ago",
        content: "Lorem ipsum Lorem ipsum Lorem ipsum...",
        category: "Divorce Cases",
        profileImage: "/DefaultProfileLawyer.png",
        link: "/cases/123",
      },
      {
        id: 2,
        username: "@legal_eagle",
        timeAgo: "1 hour ago",
        content: "You have a pending document review request...",
        category: "Legal Advice",
        profileImage: "/DefaultProfileLawyer.png",
        link: "/documents/456",
      },
      {
        id: 3,
        username: "@courtroom_warrior",
        timeAgo: "2 hours ago",
        content: "Reminder: Court hearing scheduled for tomorrow...",
        category: "Court Hearings",
        profileImage: "/DefaultProfileLawyer.png",
        link: "/hearings/789",
      },
      // Additional 6 default notifications
      {
        id: 4,
        username: "@law_and_order",
        timeAgo: "3 hours ago",
        content: "New legal discussion opened in your area...",
        category: "Legal Discussions",
        profileImage: "/DefaultProfileLawyer.png",
        link: "/discussions/321",
      },
      {
        id: 5,
        username: "@justice_served",
        timeAgo: "5 hours ago",
        content: "A client left a review on your profile...",
        category: "Client Feedback",
        profileImage: "/DefaultProfileLawyer.png",
        link: "/reviews/654",
      },
      {
        id: 6,
        username: "@legal_mind",
        timeAgo: "8 hours ago",
        content: "New contract drafting request received...",
        category: "Contracts",
        profileImage: "/DefaultProfileLawyer.png",
        link: "/contracts/987",
      },
      {
        id: 7,
        username: "@bar_exam_passer",
        timeAgo: "10 hours ago",
        content: "Your bar review discussion has new replies...",
        category: "Bar Exam",
        profileImage: "/DefaultProfileLawyer.png",
        link: "/bar-exam/112",
      },
      {
        id: 8,
        username: "@defense_attorney",
        timeAgo: "12 hours ago",
        content: "New case file uploaded for review...",
        category: "Case Files",
        profileImage: "/DefaultProfileLawyer.png",
        link: "/cases/223",
      },
      {
        id: 9,
        username: "@pro_bono_champion",
        timeAgo: "15 hours ago",
        content: "A pro bono case request is available...",
        category: "Pro Bono",
        profileImage: "/DefaultProfileLawyer.png",
        link: "/probono/334",
      },
    ];

    setNotifications(fetchedNotifications); // Simulate data loading
  }, []);

  return (
    <div
      className={`relative bg-white rounded-2xl shadow-lg w-[568px] transition-all duration-300 ${
        isExpanded ? "h-[907px]" : "h-[355px]"
      } p-5 overflow-auto`}
      onClick={() => !isExpanded && setIsExpanded(true)}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/NotificationsLogo.png" alt="Notifications" width={30} height={30} />
          <h2 className="text-2xl font-bold">Notifications:</h2>
        </div>
        <span className="text-purple-700 text-4xl font-bold">{notifications.length}</span>
      </div>

      {/* Notifications List */}
      <div className="mt-6 space-y-4">
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <div
              key={notif.id}
              className={`relative p-4 bg-gray-100 rounded-xl shadow-md transition ${
                isExpanded ? "hover:bg-gray-200 cursor-pointer" : ""
              }`}
              onClick={() => isExpanded && router.push(notif.link)}
            >
              {/* Category label */}
              <div className="absolute -top-3 right-4 flex items-center gap-2 bg-white border border-gray-300 px-3 py-1 text-sm rounded-lg shadow-md">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                {notif.category}
              </div>
              <div className="flex items-center gap-3 mt-3">
                <Image src={notif.profileImage} alt={notif.username} width={40} height={40} className="rounded-full" />
                <div className="flex-1">
                  <p className="font-semibold">Commented on a Forum</p>
                  <p className="text-sm text-gray-500">{notif.username} • {notif.timeAgo}</p>
                  <p className="text-gray-600">{notif.content}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No notifications yet.</p>
        )}
      </div>

      {/* Collapse Button */}
      {isExpanded && (
        <button
          className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-gray-200 hover:bg-gray-300 transition p-2 rounded-full shadow-lg"
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(false);
          }}
        >
          <ChevronDown size={24} className="text-gray-600" />
        </button>
      )}
    </div>
  );
};

export default LawyerNotificationsComponent;
