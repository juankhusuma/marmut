"use server";

import { sql } from "@vercel/postgres";
import { checkRole } from "./checkRole";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function handleUserLogin(formData: FormData) {
    const email = formData.get("email")! as string;
    const password = formData.get("password")! as string;
    if (!email || !password) {
        throw new Error("Email or password is empty");
    }
    const { rowCount: userRowCount } = await sql`
        SELECT * FROM AKUN
        WHERE email = ${email} AND password = ${password}
    `;
    const { rowCount: labelRowCount } = await sql`
        SELECT * FROM LABEL
        WHERE email = ${email} AND password = ${password}
    `;
    if (userRowCount !== 1 && labelRowCount !== 1) {
        console.log("Email or password is incorrect")
        redirect("/auth/login")
    }

    const roles = await checkRole(email);
    await cookies().set({
        name: "roles",
        value: JSON.stringify(roles),
    })

    await cookies().set({
        name: "email",
        value: email,
    })
    redirect("/")
}