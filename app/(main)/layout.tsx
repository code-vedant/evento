import HeaderLanding from "../components/landing/HeaderLanding";
import FooterLanding from "../components/landing/FooterLanding";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <HeaderLanding /> */}

      <main className="flex-1">
        {children}
      </main>

      <FooterLanding />
    </div>
  );
}