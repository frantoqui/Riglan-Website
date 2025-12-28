import type { PublicationFormat } from './publication';

export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'cancelled'
  | 'refunded';

export type OrderType = 'catalogue' | 'commission';

export interface OrderItem {
  publicationId?: string;
  commissionId?: string;
  format: PublicationFormat;
  title: string;
  basePrice: number;
  isPrivate: boolean;
  privatePremium: number;
  expressDelivery: boolean;
  expressDeliveryFee: number;
  catalogueInclusion: boolean;
  finalPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  userEmail: string;
  type: OrderType;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  expressDeliveryFee: number;
  privatePremium: number;
  total: number;
  currency: 'USD';
  stripePaymentIntentId?: string;
  invoiceNumber?: string;
  invoiceS3Key?: string;
  deliveryDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
