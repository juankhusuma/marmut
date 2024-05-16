"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Role } from "./checkRole"

export async function checkUser() {

    const email = cookies().get("email")?.value
    if (!email) {
        return null;
    }
    const roles = cookies().get("roles")?.value
    if (!roles) {
        await cookies().delete("email")
        await cookies().delete("roles")
        return null;
    }
    return {
        email,
        roles: JSON.parse(roles) as Role[]
    }

}