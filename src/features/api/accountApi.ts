import {UserData, UserProfile} from "../../utils/types";
import {base_url} from "../../utils/constants.ts";
import {RootState} from "../../app/store.ts";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const accountApi = createApi({
    reducerPath: "account",
    baseQuery: fetchBaseQuery({
        baseUrl: base_url,
        prepareHeaders: (headers,{getState, endpoint}) => {
            if (endpoint === 'updateUser') {
                const token = (getState() as RootState).token;
                headers.set('Authorization', token);
            }
            return headers;
        }
    }),
    endpoints: builder => ({
        registerUser: builder.mutation<UserProfile, UserProfile>({
            query: user => ({
                url: '/user',
                method: 'POST',
                body: user
            })
        }),
        fetchUser: builder.query<UserProfile,string>({
            query: token => ({
                url: '/login',
                method: 'POST',
                headers: {
                    Authorization: token
                }
            })
        }),
        updateUser: builder.mutation<UserProfile, UserData>({
            query: (user) => ({
                url: '/user',
                method: 'PUT',
                body: user
            })
        }),
        changePassword: builder.mutation<void,{newPassword: string, token: string}>({
           query: ({newPassword, token}) => ({
               url: '/user/password',
               method: 'PUT',
               headers: {
                   'X-Password': newPassword,
                   Authorization: token
               }

           })
        })
    })
})

export const {useChangePasswordMutation, useFetchUserQuery, useUpdateUserMutation,useRegisterUserMutation} = accountApi
