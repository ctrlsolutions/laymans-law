// // "use client";
// // import { useState } from "react";
// // import SignUpPage from "@/components/Auth/ChoiceComponent";
// // import SignupForm from "@/components/Auth/SignUpForm";

// // export default function SignupChoicePage() {
// //   const [userType, setUserType] = useState<"lawyer" | "layman" | null>(null);

// //   if (!userType) {
// //     // Pass setUserType as onChoose to SignUpPage
// //     return <SignUpPage onChoose={setUserType} />;
// //   }

// //   // Render the signup form with the selected userType
// //   return <SignupForm userType={userType} />;
// // }

// "use client";
// import { useState } from "react";
// import SignUpPage from "@/components/Auth/ChoiceComponent";
// import SignupForm from "@/components/Auth/SignUpForm";
// import Container from "@/components/Auth/AuthContainer"; // or your layout component

// export default function SignupChoicePage() {
//   const [userType, setUserType] = useState<"lawyer" | "layman" | null>(null);

//   return (
//     <Container
//       bgColor={userType === "lawyer" ? "blue" : "red"}
//       className="animate-bounce-to-center"
//     >
//       {!userType ? (
//         <SignUpPage onChoose={setUserType} />
//       ) : (
//         <div className="flex items-center justify-center h-full">
//           <SignupForm userType={userType} />
//         </div>
//       )}
//     </Container>
//   );
// }

"use client";
import { useState } from "react";
import SignUpPage from "@/components/Auth/ChoiceComponent";
import SignupForm from "@/components/Auth/SignUpForm";
import Container from "@/components/Auth/AuthContainer";

export default function SignupChoicePage() {
  const [userType, setUserType] = useState<"lawyer" | "layman" | null>(null);
  const [isExiting, setIsExiting] = useState(false);

  if (!userType) {
    return <SignUpPage onChoose={setUserType} />;
  }

  // Handler for back button in the form
  const handleBack = () => {
    setIsExiting(true);
    setTimeout(() => {
      setUserType(null); // Go back to choice step
      setIsExiting(false); // Reset animation state
    }, 500); // Match your animation duration
  };

  return (
    <Container
      bgColor={userType === "lawyer" ? "blue" : "red"}
      className={
        isExiting ? "animate-slide-to-left" : "animate-bounce-to-center"
      }
    >
      <div className="flex items-center justify-center h-full">
        <SignupForm userType={userType} onBack={handleBack} />
      </div>
    </Container>
  );
}
