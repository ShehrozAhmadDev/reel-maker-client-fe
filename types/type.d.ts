export interface IMessage {
  senderId: string | null;
  text: string;
  conversationId: string | null;
}

export interface PlanDataType {
  priceId: string;
  productId: string;
  features: string[];
  price: number;
  title: string;
}

export interface SubscriptionType {
  subId: string;
  startDate: number;
  endDate: number;
  customerId: string;
  productId: string;
  priceId: string;
  status: string;
}
