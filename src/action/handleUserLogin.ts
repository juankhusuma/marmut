"use server";

import { sql } from "@vercel/postgres";

export async function handleUserLogin(formData: FormData) {
    const email = formData.get("email")! as string;
    const password = formData.get("password")! as string;
    if (!email || !password) {
        throw new Error("Email or password is empty");
    }
    const { rowCount } = await sql`
        SELECT * FROM AKUN
        WHERE email = ${email} AND password = ${password}
    `;
    return rowCount == 1;
}