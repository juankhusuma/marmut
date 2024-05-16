"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function handleUserLogout() {
    await cookies().delete("roles")
    await cookies().delete("email")
    redirect("/")
}