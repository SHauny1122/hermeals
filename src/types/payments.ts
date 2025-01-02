export interface PaymentStatus {
  planId: string;
  userId: string;
  purchaseDate: Date;
  status: 'active' | 'expired';
  amount: number;
  currency: string;
}

export interface PurchaseDetails {
  planId: string;
  amount: number;
  currency: string;
}
