"use server";

import { sql } from "@vercel/postgres";
import { UUID, randomUUID } from "crypto";

export async function handleUserPL(email: string | null) {
    const data = await sql`
    SELECT *
    FROM USER_PLAYLIST
    WHERE email_pembuat = ${email}
    `;
    return data;
}

export async function handlePlaylistDTL( id_user_playlist: string | null) {
    const data = await sql`
    SELECT U.judul, AKUN.nama AS nama_pembuat, U.jumlah_lagu, U.total_durasi, U.tanggal_dibuat, U.deskripsi
    FROM USER_PLAYLIST AS U
    JOIN AKUN ON U.email_pembuat = AKUN.email
    WHERE U.id_user_playlist = ${id_user_playlist} AND U.email_pembuat = AKUN.email
    `;
    return data;
}

export async function handleSongPlaylist( id_playlist: string | null) {
    const data = await sql`
    SELECT KONTEN.judul, AKUN.nama, KONTEN.durasi, SONG.id_konten
    FROM SONG
    JOIN KONTEN ON SONG.id_konten = KONTEN.id
    JOIN ARTIST ON SONG.id_artist = ARTIST.id
    JOIN AKUN ON ARTIST.email_akun = AKUN.email
    JOIN PLAYLIST_SONG ON SONG.id_konten = PLAYLIST_SONG.id_song
    WHERE PLAYLIST_SONG.id_playlist = ${id_playlist}
    ORDER BY KONTEN.judul ASC
    `
    return data;
}

export async function handleDeletePlaylist(id_user_playlist: UUID | null) {
    await sql`
    DELETE FROM USER_PLAYLIST
    WHERE id_user_playlist = ${id_user_playlist}
    `;
}

export async function handleDeleteSong(id_playlist: string | null, id_konten: string | null) {
    await sql`
    DELETE FROM PLAYLIST_SONG
    WHERE id_playlist = ${id_playlist} AND id_song = ${id_konten}
    `;
}

export async function handleChangePlaylist(formData: FormData) {
    const judul = formData.get("judul")! as string;
    const deskripsi = formData.get("deskripsi")! as string;
    const id_user_playlist = formData.get("id_user_playlist")! as string;

    await sql`
    UPDATE USER_PLAYLIST
    SET judul = ${judul}, deskripsi = ${deskripsi}
    WHERE id_user_playlist = ${id_user_playlist}
    `;
}

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

export async function handleAddSong( id_konten: string | null, id_playlist: string | null) {
    try {
        await sql`
        INSERT INTO PLAYLIST_SONG (id_playlist, id_song) VALUES (${id_playlist}, ${id_konten})
        `
    } catch {
        console.log('addsongfailed');
        return 'failed';
    }
    console.log('addsongsuccess');
    return 'success';
}

export async function handleAddPlaylist(formData: FormData) {
    const judul = formData.get("judul")! as string;
    const deskripsi = formData.get("deskripsi")! as string;
    const email = formData.get("email")! as string;
    const date = new Date().toISOString().split('T')[0];

    var id = randomUUID();
    var id2 = randomUUID();
    await sql`
    INSERT INTO PLAYLIST (id) VALUES (${id})
    `;
    await sql`
    INSERT INTO USER_PLAYLIST (email_pembuat, id_user_playlist, judul, deskripsi, jumlah_lagu, tanggal_dibuat, id_playlist, total_durasi)
    VALUES (${email}, ${id2}, ${judul}, ${deskripsi}, 0, ${date}, ${id}, 0)
    `;
}

export async function handlePlaylistchange( id_user_playlist: string | null) {
    const data = await sql`
    SELECT id_user_playlist, judul, deskripsi
    FROM USER_PLAYLIST
    WHERE id_user_playlist = ${id_user_playlist}
    `
    return data;
}

export async function handleSongDetails( id_konten: string | null) {
    const data = await sql`
    SELECT 
        KONTEN.judul AS judul_music,
        AKUN.nama AS nama_artist,
        KONTEN.durasi AS durasi, 
        KONTEN.tanggal_rilis AS tanggal_rilis, 
        KONTEN.tahun AS tahun, 
        SONG.total_play AS total_play, 
        SONG.total_download AS total_download, 
        ALBUM.judul AS judul_album,
        SONG.id_konten AS id_konten
    FROM 
        SONG
    INNER JOIN 
        KONTEN ON SONG.id_konten = KONTEN.id
    INNER JOIN 
        ARTIST ON SONG.id_artist = ARTIST.id
    INNER JOIN 
        AKUN ON ARTIST.email_akun = AKUN.email
    INNER JOIN 
        ALBUM ON SONG.id_album = ALBUM.id
    INNER JOIN 
        GENRE ON KONTEN.id = GENRE.id_konten
    INNER JOIN 
        SONGWRITER_WRITE_SONG ON SONG.id_konten = SONGWRITER_WRITE_SONG.id_song
    INNER JOIN 
        SONGWRITER ON SONGWRITER_WRITE_SONG.id_songwriter = SONGWRITER.id
    INNER JOIN 
        AKUN AS AKUN_WRITER ON SONGWRITER.email_akun = AKUN_WRITER.email
    WHERE 
        SONG.id_konten = ${id_konten}
    GROUP BY 
        SONG.id_konten, KONTEN.judul, AKUN.nama, KONTEN.durasi, KONTEN.tanggal_rilis, KONTEN.tahun, ALBUM.judul
    `;
    return data;
}

export async function handleSongGenre(id_konten: string | null) {
    const data = await sql`
    SELECT
        GENRE.genre
    FROM 
        SONG
    INNER JOIN
        GENRE ON SONG.id_konten = GENRE.id_konten
    WHERE 
        SONG.id_konten = ${id_konten}
    `;
    return data;
}

export async function handeSongWriter(id_konten: string | null) {
    const data = await sql`
    SELECT
        AKUN.nama
    FROM 
        SONG
    INNER JOIN
        SONGWRITER_WRITE_SONG ON SONG.id_konten = SONGWRITER_WRITE_SONG.id_song
    INNER JOIN
        SONGWRITER ON SONGWRITER_WRITE_SONG.id_songwriter = SONGWRITER.id
    INNER JOIN
        AKUN ON SONGWRITER.email_akun = AKUN.email
    WHERE 
        SONG.id_konten = ${id_konten}
    `;
    return data;
}

export async function handleDownloadSong(email: string, id_song: string) {
    await sql`
    INSERT INTO DOWNLOADED_SONG (id_song, email_downloader) VALUES (${id_song}, ${email})
    `;
}

export async function isDownloaded(email: string, id_song: string) {
    return sql`
    SELECT EXISTS (
        SELECT
            * 
        FROM 
            DOWNLOADED_SONG
        WHERE
            id_song = ${id_song} AND email_downloader = ${email}
    )
    `;
}