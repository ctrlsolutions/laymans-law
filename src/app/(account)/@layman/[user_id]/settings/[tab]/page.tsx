import { notFound } from "next/navigation";
import SettingsForm from "@/components/Profile/SettingsForm";
import ComingSoon from "@/components/Global/ComingSoon";

// Define components explicitly
const ProfileSettings: React.FC = (props) => (
  <SettingsForm userType="layman" {...props} />
);

const settingsComponents: Record<string, React.FC> = {
  profile: ProfileSettings,
  security: ComingSoon,
  notifications: ComingSoon,
};

export default function SettingsPage({ params }: { params: { tab: string } }) {
  const Component = settingsComponents[params.tab];

  if (!Component) return notFound(); // 🔥 404 if tab does not exist

  return <Component />; // 🔥 Dynamically render the correct component
}
