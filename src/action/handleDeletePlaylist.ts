"use server";

import { sql } from "@vercel/postgres";
import { UUID } from "crypto";

export async function handleDeletePlaylist(id_user_playlist: UUID | null) {
    await sql`
    DELETE FROM USER_PLAYLIST
    WHERE id_user_playlist = ${id_user_playlist}
    `;
}