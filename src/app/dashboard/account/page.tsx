import CaseContainer from "@/components/Profile/CaseContainer";
import LawyerActiveCases from "@/components/Profile/LawyerActiveCases";
import InformationComponent from "@/components/Profile/InformationComponent";
import NotificationComponent from "@/components/Profile/NotificationComponent";
import NotificationContainer from "@/components/Profile/NotificationContainer";
import Statistics from "@/components/Profile/statistics";

const userData = {
    name: "LeBron James",
    avatar: '/DefaultProfile.png',
    role: "Layman",
    address: "Los Angeles, California, USA",
    email: "kingjames@gmail.com",
    phone: "09615727576",
    gender: "Male",
    birthdate: "December 12, 2003",
}


const Home = () => {
    
    return (
        <>
            <div className="grid grid-cols-[40%_1fr] grid-row-2 gap-3 h-[90vh]">
                <div className="row-span-1 flex flex-col gap-3">
                    <InformationComponent userData={userData}/>
                    <Statistics />
                </div>
                
                <div className="col-span-1">
                    <CaseContainer count={12}>
                            <LawyerActiveCases />
                    </CaseContainer>
                </div>
            </div>
        </>
    );
    
}

export default Home;