export interface IMessage {
  senderId: string | null;
  text: string;
  conversationId: string | null;
}

export interface PlanDataType {
  createdAt: string;
  description: string;
  duration: number;
  features: string[];
  length: number;
  noOfVideos: number;
  price: number;
  title: string;
  updatedAt: string;
  __v: number;
  _id: string;
}
