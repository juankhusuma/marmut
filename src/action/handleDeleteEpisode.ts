"use server"

import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";

export async function handleDeleteEpisode(formData: FormData) {
    const id = formData.get("id") as string;
    await sql`DELETE FROM episode WHERE id_episode = ${id}`;

    redirect("/podcast/list")
}