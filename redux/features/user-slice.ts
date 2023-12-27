import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  value: userState;
}

interface userI {
  id: string;
  fullName: string;
  email: string;
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
