"use server";

import { sql } from "@vercel/postgres";
import { UUID } from "crypto";

export async function handlePlaylistDTL(id_user_playlist: UUID | null) {
    const data = await sql`
    SELECT U.judul, AKUN.nama AS nama_pembuat, U.jumlah_lagu, U.total_durasi, U.tanggal_dibuat, U.deskripsi
    FROM USER_PLAYLIST AS U
    JOIN AKUN ON U.email_pembuat = AKUN.email
    WHERE U.id_user_playlist = ${id_user_playlist} AND U.email_pembuat = AKUN.email
    `;
    return data;
}

export async function handleSongPlaylist( id_playlist: UUID | null) {
    const data = await sql`
    SELECT KONTEN.judul, AKUN.nama, KONTEN.durasi
    FROM SONG
    JOIN KONTEN ON SONG.id_konten = KONTEN.id
    JOIN ARTIST ON SONG.id_artist = ARTIST.id
    JOIN AKUN ON ARTIST.email_akun = AKUN.email
    JOIN PLAYLIST_SONG ON SONG.id_konten = PLAYLIST_SONG.id_song
    WHERE PLAYLIST_SONG.id_playlist = ${id_playlist}
    `
    return data;
}