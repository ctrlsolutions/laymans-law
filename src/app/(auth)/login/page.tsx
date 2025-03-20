import AuthContainer from "@/components/Auth/AuthContainer";
import LoginForm from "@/components/Auth/LogInForm";
import Login from "./login";

export default function LoginPage() {
  return (
    <AuthContainer bgColor="black">
      <div className="h-fit w-full flex flex-col gap-9 my-8 px-6 sm:gap-3 items-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black">
          Login
        </h1>
        <p className="text-gray-600 sm:text-xl">
          Welcome back! Please log in to your account.
        </p>
        <LoginForm />
      </div>
    </AuthContainer>
  );
}
