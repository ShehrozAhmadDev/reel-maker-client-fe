import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  value: userState;
}

interface ISubscription {
  _id: string;
  subscriptionId: string;
  planId: string;
  priceId: string;
  userId: string;
  status: string;
  noOfVideosRemaining: number;
  paymentStatus: string;
  expiryDate: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

interface userI {
  id: string;
  fullName: string;
  email: string;
  stripeId?: string;
  subscriptionId?: ISubscription | null;
}

interface userState {
  user: userI | null;
}

const initialState = {
  value: {
    user: null,
  } as userState,
} as InitialState;

export const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<userI | null>) => {
      state.value.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
