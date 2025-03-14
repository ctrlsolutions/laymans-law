// this is used by layout.tsx
import UserProfile from "./Information";
import Notifications from "./notifications";
import Cases from "./cases";

const Home = () => {
    
    return (
        <>
        <div className="w-full h-full flex flex-col flex-wrap justify-between content-between">
            <UserProfile />
            <Notifications />
            <Cases className="flex-grow"/>
        </div>
        </>
    );
    
}

export default Home;