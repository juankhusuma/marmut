"use server"

import { uuid } from "@/utils/uuid";
import { sql } from "@vercel/postgres"
import { redirect } from "next/navigation";

export async function handleCreateEpisode(formData: FormData) {
    const judul = formData.get("judul") as string;
    const deskripsi = formData.get("deskripsi") as string;
    const durasi = formData.get("durasi") as string;
    const uid = formData.get("uid") as string;

    await sql`
    INSERT INTO episode(id_episode, id_konten_podcast, judul, deskripsi, durasi, tanggal_rilis)
    VALUES (${uuid()}, ${uid}, ${judul}, ${deskripsi}, ${durasi}, NOW())
    `;

    redirect("/podcast/list")
}