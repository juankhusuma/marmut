"use server"

import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";

export async function handleDeletePodcast(formData: FormData) {
    const id = formData.get("id") as string;
    await sql`DELETE FROM konten WHERE id = ${id}`;

    redirect("/podcast/list")
}