import { Footer, Header } from "@app/components/layout";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header variant="landing" />

      {children}

      <Footer />
    </div>
  );
}
