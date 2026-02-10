export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type PaymentMethod = 'card' | 'upi' | 'wallet' | 'cash';

export interface Payment {
  id: string;
  appointmentId: string;
  amount: number;
  currency: 'INR';
  status: PaymentStatus;
  paymentMethod: PaymentMethod;
  transactionId?: string;
  paidAt?: Date;
  receiptUrl?: string;
}
