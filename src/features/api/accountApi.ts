import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserData, UserProfile, UserRegister } from "../../utils/types";
import { base_url, createToken } from "../../utils/constants.ts";
import { RootState } from "../../app/store.ts";

export const registerUser = createAsyncThunk(
    'users/register',
    async (user: UserRegister) => {
        const response = await fetch(`${base_url}/register`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.status === 409) {
            throw new Error(`user ${user.login} already exists`);
        }
        if (!response.ok) {
            throw new Error('Something went wrong');
        }
        const data = await response.json();
        const token = createToken(user.login, user.password);
        return { user: data, token };
    }
);

export const fetchUser = createAsyncThunk(
    'users/fetch',
    async (token: string) => {
        const response = await fetch(`${base_url}/login`, {
            method: 'POST',
            headers: {
                Authorization: token,
            }
        });
        if (response.status === 401) {
            throw new Error(`login or password incorrect`);
        }
        if (!response.ok) {
            throw new Error('Something went wrong');
        }
        const data = await response.json();
        return { user: data, token };
    }
);

export const updateUser = createAsyncThunk<UserProfile, UserData, { state: RootState }>(
    'users/update',
    async (user, { getState }) => {
        const token = getState().token;
        const login = getState().user.login;
        const response = await fetch(`${base_url}/user/${login}`, {
            method: 'PATCH',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            }
        });
        if (response.status === 401) {
            throw new Error(`login or password incorrect`);
        }
        if (!response.ok) {
            throw new Error('Something went wrong');
        }
        return await response.json();
    }
);

export const changePassword = createAsyncThunk<string, { newPassword: string, oldPassword: string }, { state: RootState }>(
    'user/password',
    async ({ newPassword, oldPassword }, { getState }) => {
        const token = createToken(getState().user.login, oldPassword);
        const response = await fetch(`${base_url}/password`, {
            method: 'PATCH',
            headers: {
                'X-Password': newPassword,
                Authorization: token
            }
        });
        if (response.status === 401) {
            throw new Error(`login or password incorrect`);
        }
        if (!response.ok) {
            throw new Error('Something went wrong');
        }
        return createToken(getState().user.login, newPassword);
    }
);
