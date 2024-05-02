"use server";

import { sql } from "@vercel/postgres";

export async function handleUserPL(email: string | null) {
    const data = await sql`
    SELECT judul, jumlah_lagu, total_durasi 
    FROM USER_PLAYLIST
    WHERE email_pembuat = ${email}
    `;
    return data;
}