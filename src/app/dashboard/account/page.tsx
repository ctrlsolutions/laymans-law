import InformationComponent from "@/components/Profile/InformationComponent";
import NotificationComponent from "@/components/Profile/NotificationComponent";
import NotificationContainer from "@/components/Profile/NotificationContainer";
import Statistics from "@/components/Profile/statistics";
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
}

const cases = [
    {
      id: 1,
      caseTitle: "Case 1",
      timeAgo: "2 hours ago",
      description: "Lorem ipsum dolor sit amet.",
      category: "Criminal",
      profileImage: "/DefaultProfile.png",
      link: "/cases/1"
    },
    {
      id: 2,
      caseTitle: "Case 2",
      timeAgo: "5 hours ago",
      description: "Consectetur adipiscing elit.",
      category: "Civil",
      profileImage: "/DefaultProfile.png",
      link: "/cases/2"
    }
  ];

const Home = () => {
    
    return (
        <>
            <div className="grid grid-cols-[40%_1fr] grid-row-2 gap-3 h-[90vh]">
                <div className="row-span-1 flex flex-col gap-3">
                    <InformationComponent userData={userData}/>
                    <Statistics />
                </div>


                
                <div className="row-span-1 flex flex-col gap-3">
                    <NotificationContainer count={12}>
                            <NotificationComponent />
                    </NotificationContainer>

                    <ActiveCasesContainer count={cases.length}>
                        {cases.map((item) => (
                        <ActiveCasesComponent key={item.id} caseItem={item} />
                    ))}
                    </ActiveCasesContainer>
                </div>
            </div>
        </>
    );
    
}

export default Home;