"use server"

import { redirect } from "next/navigation"
import { sql } from "@vercel/postgres";

export async function handleDeleteSong(formData: FormData) {
    const song = formData.get("id")! as any;
    
    await sql `DELETE FROM SONG WHERE SONG.id_konten = ${song}`
    redirect("/")
}