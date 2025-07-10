import { cache } from "react";
import { getUserSubscription } from "./supabase-db";
import { env } from "@/env";

export type SubscriptionLevel = "free" | "professional" | "premium-pro";

export const getUserSubscriptionLevel = cache(
  async (userId: string): Promise<SubscriptionLevel> => {
    const subscription = await getUserSubscription(userId);

    if (!subscription || new Date(subscription.stripe_current_period_end) < new Date()) {
      return "free";
    }

    if (
      subscription.stripe_price_id === env.NEXT_PUBLIC_STRIPE_PRICE_ID_PROFESSIONAL
    ) {
      return "professional";
    }

    if (
      subscription.stripe_price_id === env.NEXT_PUBLIC_STRIPE_PRICE_ID_PREMIUM_PRO
    ) {
      return "premium-pro";
    }

    throw new Error("Invalid subscription");
  },
);
