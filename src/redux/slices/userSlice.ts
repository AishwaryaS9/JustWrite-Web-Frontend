import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserPayload {
    token: string | null;
    name: string | null;
    userId: string |null;
}

interface UserState {
    isLoggedIn: boolean;
    token: string | null;
    userId: string | null;
    name: string | null;
    isLoading: boolean;
    data: UserPayload | null;
}


export const initialState = {
    isLoggedIn: false,
    token: null,
    userId: null,
    name: null,
    isLoading: false,
    data: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userLogin: (state: UserState, action: PayloadAction<{ token: string; userId: string; name: string; }>) => {
            state.isLoggedIn = true;
            state.token = action.payload.token;
            state.userId = action.payload.userId;
            state.name = action.payload.name;
            state.data = action.payload;
        },
        clearLogin(state) {
            state.isLoggedIn = false;
            state.token = null;
            state.userId = null;
            state.name = null;
            state.data = null;
        },
    }
})

export const { userLogin, clearLogin } = userSlice.actions;

export const userReducer = userSlice.reducer;