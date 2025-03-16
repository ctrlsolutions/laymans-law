"use client";
interface NotificationContainerProps {
    children: React.ReactNode;
    count: number;
}

const NotificationContainer: React.FC<NotificationContainerProps> = ({ children, count }) => {
    
    console.log("NotificationContainer rendered with count:", count);
    return (
        <div className="w-full m-3 p-6 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.25)] rounded-3xl bg-white">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold text-black">Notifications</h1>
                <p className="text-rose-500 text-lg font-semibold">{count}</p>
            </div>
            <div className="flex flex-col items-center space-y-4">
                {children}
            </div>
        </div>
    );
};

export default NotificationContainer;