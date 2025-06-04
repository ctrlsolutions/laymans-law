"use client";

interface NotificationItemProps {
  notification?: {
    id: number;
    title: string;
    username: string;
    description: string;
    timeAgo: string;
    category: string;
  };
}

const NotificationComponent: React.FC<NotificationItemProps> = ({
  notification,
}) => {
  if (!notification) {
    console.warn("Missing notification prop");
  }

  return (
    <div className="relative shadow-[0px_4px_20px_0px_rgba(0,0,0,0.2)] rounded-3xl p-8 flex m-[.25rem] items-center w-full">
      {/* Category in the upper right */}
      <div className="absolute -top-3 right-8 flex items-center gap-2 bg-white text-black font-semibold border border-gray-300 px-3 py-1 text-sm rounded-lg shadow-md">
        <span className="w-3 h-3 rounded-full bg-green-500"></span>
        {notification?.category || "Uncategorized"}
      </div>

      {/* Notification Details */}
      <div className="flex-1 ml-[.750rem] mr-[1.9rem]">
        <h2 className="text-lg font-extrabold text-purple-950">
          {notification?.title || "No Title"}
        </h2>
        <div className="text-sm text-gray-500">
          {notification?.username || "@Anonymous"} •{" "}
          {notification?.timeAgo || "N/A"}
        </div>
        <p className="text-black text-sm pt-[.25rem] pl-[.25rem]">
          {notification?.description || "No description available"}
        </p>
      </div>
    </div>
  );
};

export default NotificationComponent;
