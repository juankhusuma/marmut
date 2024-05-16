"use server";

import { sql } from "@vercel/postgres";

export type Role = "PREMIUM" | "NONPREMIUM" | "SONGWRITER" | "PODCASTER" | "LABEL" | "ARTIST";

export async function checkRole(email: string) {
    let roles: string[] = []
    const premium = await sql`
        SELECT * FROM PREMIUM
        WHERE email = ${email}
    `
    if (premium.rowCount == 1) {
        roles.push("PREMIUM")
    } else {
        roles.push("NONPREMIUM")
    }

    const songwriter = await sql`
        SELECT * FROM SONGWRITER
        WHERE email_akun = ${email}
    `
    if (songwriter.rowCount == 1) {
        roles.push("SONGWRITER")
    }

    const podcaster = await sql`
        SELECT * FROM PODCASTER
        WHERE email = ${email}
    `
    if (podcaster.rowCount == 1) {
        roles.push("PODCASTER")
    }

    const label = await sql`
        SELECT * FROM LABEL
        WHERE email = ${email}
    `

    if (label.rowCount == 1) {
        roles.push("LABEL")
    }

    const artist = await sql`
        SELECT * FROM ARTIST
        WHERE email_akun = ${email}
    `

    if (artist.rowCount == 1) {
        roles.push("ARTIST")
    }

    return roles as Role[]
}