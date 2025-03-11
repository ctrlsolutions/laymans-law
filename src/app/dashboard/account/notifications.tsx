
const Notifications: React.FC = () => {
    return (
        <>
        <div className="w-[48%] flex-grow p-5 mt-[3vh] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.25)] rounded-3xl text-black flex flex-col items-center">
            <div className="flex justify-between w-full mb-3">
                <h1 className=" font-extrabold text-xl">Notifications</h1> 
                <p className="font-extrabold text-red text-2xl">142</p>
            </div>
            <div className="w-full h-full flex flex-col items-center relative">
                <div className="p-5 absolute bg-white left-1/2 -translate-x-1/2 w-[98%] shadow-[0px_4px_20px_0px_rgba(0,1,0.2,0.2)] rounded-3xl h-[76%] z-20">
                {/* top notif */}
                </div>
                <div className="absolute bg-white left-1/2 -translate-x-1/2 w-[96%] shadow-[0px_4px_20px_0px_rgba(0,1,0.2,0.2)] rounded-3xl h-[84%] z-10"></div>
                <div className="absolute bg-white left-1/2 -translate-x-1/2 w-[94%] shadow-[0px_4px_20px_0px_rgba(0,1,0.2,0.2)] rounded-3xl h-[92%]"></div>
            </div>


        </div>
        </>
    )
};

export default Notifications;