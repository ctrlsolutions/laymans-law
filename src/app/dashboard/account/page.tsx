import InformationComponent from "@/components/Profile/InformationComponent";
import NotificationComponent from "@/components/Profile/NotificationComponent";
import NotificationContainer from "@/components/Profile/NotificationContainer";
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

// 6 Cases with detailed descriptions
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
    },
    { 
        id: 3, 
        caseTitle: "Estafa", 
        timeAgo: "1 day ago", 
        description: "A businessman is accused of estafa for allegedly running a Ponzi scheme. Victims claim they were promised high returns but were scammed out of millions. The prosecution is gathering more evidence.", 
        category: "Criminal", 
        link: "/cases/3" 
    },
    { 
        id: 4, 
        caseTitle: "Breach of Contract", 
        timeAgo: "3 days ago", 
        description: "A supplier filed a lawsuit against a client for breach of contract. The client allegedly failed to deliver payment despite receiving the goods. The case seeks financial compensation and damages.", 
        category: "Civil", 
        link: "/cases/4" 
    },
    { 
        id: 5, 
        caseTitle: "Land Dispute", 
        timeAgo: "1 week ago", 
        description: "Two families are entangled in a land ownership dispute. Both parties claim legitimate titles to the same property. The court has ordered a review of property documents.", 
        category: "Labor", 
        link: "/cases/5" 
    },
    { 
        id: 6, 
        caseTitle: "Tax Evasion", 
        timeAgo: "2 weeks ago", 
        description: "A prominent businessman is under investigation for tax evasion. Authorities allege the suspect falsified financial records to avoid paying taxes. The defense argues the inconsistencies were accidental.", 
        category: "Criminal", 
        link: "/cases/6" 
    }
];

const Home = () => {
    return (
        <>
            <div className="grid grid-cols-[40%_1fr] grid-row-2 gap-3 h-[90vh]">
                <div className="row-span-1 flex flex-col gap-3">
                    <InformationComponent userData={userData} />
                    <StatisticsComponent />
                </div>

                <div className="row-span-1 flex flex-col gap-3">
                    <NotificationContainer count={12}>
                        <NotificationComponent />
                    </NotificationContainer>

                    {/* Scrollable Cases */}
                    <Card className="w-[42.5vw] h-[65vh] overflow-hidden">
                        <ActiveCasesContainer count={cases.length}>
                            <div className="overflow-y-auto max-h-[52vh] pr-2">
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
        </>
    );
};

export default Home;
