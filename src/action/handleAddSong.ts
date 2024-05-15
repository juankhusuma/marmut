"use server";

import { sql } from "@vercel/postgres";
import { error } from "console";
import { UUID } from "crypto";

export async function handleListSong() {
    const data = await sql`
    SELECT SONG.id_konten, KONTEN.judul, AKUN.nama
    FROM SONG
    JOIN KONTEN ON SONG.id_konten = KONTEN.id
    JOIN ARTIST ON SONG.id_artist = ARTIST.id
    JOIN AKUN ON ARTIST.email_akun = AKUN.email
    ORDER BY KONTEN.judul ASC
    `;
    return data;
}

export async function handleAddSong( id_konten: string, id_playlist:UUID) {
    await sql`
    INSERT INTO PLAYLIST_SONG (id_playlist, id_song) VALUES (${id_playlist}, ${id_konten})
    `;
}