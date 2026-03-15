import { Navbar } from "@/components/navbar";
import { AnnouncementBanner } from "@/components/LandingPages/AnnouncementBanner";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <AnnouncementBanner />
      <Navbar />
      <main className="flex-grow">{children}</main>
    </div>
  );
}
