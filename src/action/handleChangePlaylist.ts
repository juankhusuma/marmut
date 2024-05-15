"use server";

import { sql } from "@vercel/postgres";
import { randomUUID } from "crypto";

export async function handleAddPlaylist(formData: FormData) {
    const judul = formData.get("judul")! as string;
    const deskripsi = formData.get("deskripsi")! as string;
    const email = formData.get("email")! as string;
    const date = new Date().toISOString().split('T')[0];
    
    await sql`
    INSERT INTO USER_PLAYLIST (email_pembuat, id_user_playlist, judul, deskripsi, jumlah_lagu, tanggal_dibuat, id_playlist, total_durasi)
    VALUES (${email}, ${id2}, ${judul}, ${deskripsi}, 0, ${date}, ${id}, 0)
    `;
}