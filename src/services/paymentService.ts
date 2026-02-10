import { Payment, PaymentMethod } from '@/types/payments';
import { saveToLocalStorage, loadFromLocalStorage } from '@/utils/localStorageHelpers';

const STORAGE_KEY = 'payments';

const getStoredPayments = (): Payment[] => {
  return loadFromLocalStorage<Payment[]>(STORAGE_KEY, []);
};

let payments: Payment[] = getStoredPayments();

const savePayments = () => {
  saveToLocalStorage(STORAGE_KEY, payments);
};

export const processPayment = async (
  appointmentId: string,
  amount: number,
  method: PaymentMethod
): Promise<Payment> => {
  // Simulate payment processing
  await new Promise(resolve => setTimeout(resolve, 1500));

  const payment: Payment = {
    id: `pay-${Date.now()}`,
    appointmentId,
    amount,
    currency: 'INR',
    status: 'completed',
    paymentMethod: method,
    transactionId: `TXN${Date.now()}`,
    paidAt: new Date(),
    receiptUrl: `/receipts/${Date.now()}.pdf`,
  };

  payments.push(payment);
  savePayments();

  return payment;
};

export const getPaymentByAppointment = (appointmentId: string): Payment | undefined => {
  return payments.find(p => p.appointmentId === appointmentId);
};

export const getAllPayments = (): Payment[] => {
  return payments.sort((a, b) => {
    const dateA = a.paidAt || new Date(0);
    const dateB = b.paidAt || new Date(0);
    return dateB.getTime() - dateA.getTime();
  });
};

export const generateReceipt = (paymentId: string): Blob => {
  const payment = payments.find(p => p.id === paymentId);
  if (!payment) {
    throw new Error('Payment not found');
  }

  const receiptContent = `
PAYMENT RECEIPT
--------------
Receipt ID: ${payment.id}
Transaction ID: ${payment.transactionId}
Date: ${payment.paidAt?.toLocaleDateString()}
Amount: ₹${payment.amount}
Payment Method: ${payment.paymentMethod.toUpperCase()}
Status: ${payment.status.toUpperCase()}

Thank you for your payment!
  `;

  return new Blob([receiptContent], { type: 'application/pdf' });
};

export const refundPayment = async (paymentId: string): Promise<boolean> => {
  // Simulate refund processing
  await new Promise(resolve => setTimeout(resolve, 1000));

  const index = payments.findIndex(p => p.id === paymentId);
  if (index !== -1) {
    payments[index] = {
      ...payments[index],
      status: 'refunded',
    };
    savePayments();
    return true;
  }
  return false;
};
