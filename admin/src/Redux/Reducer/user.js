import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
    currentUser: null,
    isFetching: false,
    error: false,
}

export const userSlice = createSlice({
    name: "user",
    initialState: initialStateValue,
    reducers:{
        loginStart: (state) => {
            state.isFetching = true;
          },
          loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
          },
          loginFailure: (state) => {
            state.isFetching = false;
            state.error = true;
          },
    }
});

export const { loginStart, loginSuccess, loginFailure } = userSlice.actions;

export default userSlice.reducer;