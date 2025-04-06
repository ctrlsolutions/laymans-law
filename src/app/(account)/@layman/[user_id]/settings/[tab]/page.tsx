import { notFound } from "next/navigation";
import SettingsForm from "@/components/Profile/SettingsForm";
import ComingSoon from "@/components/Global/ComingSoon";

const ProfileSettings: React.FC = (props) => (
  <SettingsForm userType="layman" {...props} />
);

const settingsComponents: Record<string, React.FC> = {
  profile: ProfileSettings,
  security: ComingSoon,
  notifications: ComingSoon,
};

export default async function SettingsPage({ params }: { params: { tab: string } }) {
  const Component = settingsComponents[params.tab];

  if (!Component) return notFound();

  return <Component />;
}
