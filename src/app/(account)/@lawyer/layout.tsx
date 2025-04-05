export default function LawyerLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    // This layout component simply renders its children.
    // You can add common UI elements for the @lawyer route here if needed in the future,
    // such as a specific header, sidebar, or wrapper div with styling.
    return <>{children}</>;
  }
  