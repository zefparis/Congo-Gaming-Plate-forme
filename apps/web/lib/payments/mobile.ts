import { z } from 'zod';

export const mobileOperators = ['orange', 'airtel', 'vodacom'] as const;
export type MobileOperator = (typeof mobileOperators)[number];

export const paymentSchema = z.object({
  amount: z.number().min(500).max(1000000),
  operator: z.enum(mobileOperators),
  phone: z.string().regex(/^(\+243|0)?[0-9]{9}$/),
});

export type PaymentRequest = z.infer<typeof paymentSchema>;

export interface PaymentResponse {
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
  txId: string;
  message?: string;
}

export const operatorConfig = {
  orange: {
    name: 'Orange Money',
    color: '#FF6600',
    icon: '🟠',
  },
  airtel: {
    name: 'Airtel Money',
    color: '#ED1C24',
    icon: '🔴',
  },
  vodacom: {
    name: 'M-Pesa',
    color: '#00A651',
    icon: '🟢',
  },
};
