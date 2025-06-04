import { notFound } from "next/navigation";
import SettingsForm from "@/components/Profile/SettingsForm";
import ComingSoon from "@/components/Global/ComingSoon";

const settingsComponents: Record<string, React.FC> = {
  profile: (props) => <SettingsForm userType="lawyer" {...props} />,
  security: ComingSoon,
  notifications: ComingSoon,
};

export default async function SettingsPage({
  params,
}: {
  params: { tab: string };
}) {
  const Component = settingsComponents[params.tab];

  if (!Component) return notFound();

  return <Component />;
}
