"user server";

import { sql } from "@vercel/postgres";

type Role = "PREMIUM" | "NONPREMIUM" | "SONGWRITER" | "PODCASTER";

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
}