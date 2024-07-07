"use server";

import { SignInData, SignUpData } from "@/lib/schemas/authSchema";
import { signIn, signUp } from "@/lib/requests";
import { cookies } from "next/headers";
import { User } from "@/types/User";
import { redirect } from "next/navigation";

export const handleSignIn = async (data: SignInData) => {
    const response = await signIn(data)

    if (response.data) {
        cookies().set({
            name: process.env.NEXT_PUBLIC_AUTH_KEY as string,
            value: response.data.access_token,
            httpOnly: true,
            maxAge: 86400 * 7, // 7 days
        })
    }

    return response
}

export const handleSignUp = async (data: SignUpData) => {
    const response = await signUp(data)

    if (response.data) {
        cookies().set({
            name: process.env.NEXT_PUBLIC_AUTH_KEY as string,
            value: response.data.access_token,
            httpOnly: true,
            maxAge: 86400 * 7, // 7 days
        })
    }

    return response
}

export const handleGetUser = async () => {
    const authCookie = cookies().get(process.env.NEXT_PUBLIC_AUTH_KEY as string)?.value

    const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/api/v1/accounts/me', {
        headers: {
            Authorization: `Bearer ${authCookie}`
        }
    })

    const jsonResponse = await response.json()
    const userData = jsonResponse.user

    if (userData) return userData as User

    return null
}

export const handleSignOut = () => {
    cookies().delete(process.env.NEXT_PUBLIC_AUTH_KEY as string)
    redirect('/auth/signin')
}