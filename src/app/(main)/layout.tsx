import { getUserSubscriptionLevel } from "@/lib/subscription";
import Navbar from "./Navbar";
import SubscriptionLevelProvider from "./SubscriptionLevelProvider";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // For now, we'll use a default subscription level
  // In a real app, you'd get this from Supabase server-side
  const userSubscriptionLevel = 'free';

  return (
    <SubscriptionLevelProvider userSubscriptionLevel={userSubscriptionLevel}>
      <div className="flex min-h-screen flex-col bg-[#0a0c1b]">
        <Navbar />
        <main className="flex-1 bg-gradient-to-br from-[#1a1f35] to-[#0a0c1b]">
          {children}
        </main>
        {/* <PremiumModal /> */}
      </div>
    </SubscriptionLevelProvider>
  );
}
