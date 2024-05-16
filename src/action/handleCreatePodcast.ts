"use server";

import { uuid } from "@/utils/uuid";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";

export async function handleCreatePodcast(formData: FormData) {
    const judul = formData.get("judul") as string;
    const genre = formData.getAll("genre") as string[];
    const durasi = formData.get("durasi") as string;
    const email = formData.get("email") as string;

    const id = uuid()
    console.log(id)

    await sql`
    INSERT INTO konten(id, judul, durasi, tahun, tanggal_rilis)
    VALUES (${id}, ${judul}, ${durasi}, ${new Date().getFullYear()}, ${new Date().toISOString()})
    `

    await sql`
    INSERT INTO podcast(email_podcaster, id_konten)
    VALUES (${email}, ${id})
    `

    for (const g of genre) {
        await sql`
        INSERT INTO genre(id_konten, genre)
        VALUES (${id}, ${g})
        `
    }

    redirect("/podcast/list")
}