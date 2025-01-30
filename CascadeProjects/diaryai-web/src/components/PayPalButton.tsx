'use client';

import { useEffect } from 'react';
import { loadScript } from "@paypal/paypal-js";

interface PayPalButtonProps {
  onSuccess?: () => void;
}

export default function PayPalButton({ onSuccess }: PayPalButtonProps) {
  useEffect(() => {
    const initPayPal = async () => {
      try {
        const paypal = await loadScript({ 
          clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
          intent: "subscription",
          vault: true,
        });

        if (paypal) {
          paypal.Buttons({
            style: {
              layout: 'vertical',
              color: 'blue',
              shape: 'rect',
              label: 'subscribe'
            },
            createSubscription: function(data: any, actions: any) {
              return actions.subscription.create({
                'plan_id': process.env.NEXT_PUBLIC_PAYPAL_PLAN_ID
              });
            },
            onApprove: function(data: any, actions: any) {
              console.log('Subscription successful!', data.subscriptionID);
              onSuccess?.();
            }
          }).render('#paypal-button-container');
        }
      } catch (error) {
        console.error('Failed to load PayPal:', error);
      }
    };

    initPayPal();
  }, [onSuccess]);

  return (
    <div id="paypal-button-container" className="w-full"></div>
  );
}
