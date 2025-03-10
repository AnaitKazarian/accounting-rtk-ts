import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserProfile} from "../../utils/types";
import {fetchUser, registerUser, updateUser} from "../api/accountApi.ts";

const initialState = {} as UserProfile;

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (_state, action: PayloadAction<UserProfile>) => action.payload,
        deleteUser: () => initialState,
        changeFirstName: (state, action: PayloadAction<string>) => {
            state.firstName = action.payload;
        },
        changeLastName: (state, action: PayloadAction<string>) => {
            state.lastName = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(registerUser.fulfilled, (_state, action) => action.payload.user)
            .addCase(fetchUser.fulfilled, (_state, action) => action.payload.user)
            .addCase(updateUser.fulfilled, (_state, action) => action.payload)
    }
})

export const {setUser, deleteUser, changeLastName, changeFirstName} = userSlice.actions;
export default userSlice.reducer;