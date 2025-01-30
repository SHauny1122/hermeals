'use client';

import { useEffect } from 'react';
import { PayPalButtons } from "@paypal/react-paypal-js";

interface PayPalSubscribeButtonProps {
  onSuccess?: () => void;
}

export default function PayPalSubscribeButton({ onSuccess }: PayPalSubscribeButtonProps) {
  return (
    <PayPalButtons
      createSubscription={(data, actions) => {
        return actions.subscription.create({
          'plan_id': process.env.NEXT_PUBLIC_PAYPAL_PLAN_ID as string // Pro Plan ID
        });
      }}
      style={{
        label: 'subscribe',
        color: 'blue'
      }}
      onApprove={(data, actions) => {
        console.log('Subscription approved:', data.subscriptionID);
        onSuccess?.();
        return Promise.resolve();
      }}
    />
  );
}
