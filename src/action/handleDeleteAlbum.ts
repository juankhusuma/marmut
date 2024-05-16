"use server"

import { redirect } from "next/navigation"
import { sql } from "@vercel/postgres";

export async function handleDeleteAlbum(formData: FormData) {
    const albumId = formData.get("id")! as string;
    
    await sql `DELETE FROM ALBUM WHERE ALBUM.id = ${albumId}`
    redirect("/")
}