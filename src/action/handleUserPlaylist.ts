"use server";

import { triggerToast } from "@/utils/toast";
import { sql } from "@vercel/postgres";
import { timeStamp } from "console";
import exp from "constants";
import { UUID, randomUUID } from "crypto";
import { redirect } from "next/navigation"

// Select Section

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
    `;
    return data;
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

export async function handleSongWriter(id_konten: string | null) {
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

// Delete Section

export async function handleDeletePlaylist(id_user_playlist: string | null, id_playlist: string | null) {
    await sql`
    DELETE FROM USER_PLAYLIST
    WHERE id_user_playlist = ${id_user_playlist}
    `;
    await sql`
    DELETE FROM PLAYLIST_SONG
    WHERE id_playlist = ${id_playlist}
    `;
    await sql`
    DELETE FROM PLAYLIST
    WHERE id = ${id_playlist}
    `;
}

export async function handleDeleteSong(id_playlist: string | null, id_konten: string | null) {
    await sql`
    DELETE FROM PLAYLIST_SONG
    WHERE id_playlist = ${id_playlist} AND id_song = ${id_konten}
    `;
}

// Update Section

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

export async function handleUpdateTotalPlaySong( id_konten: string ) {
    await sql`
    UPDATE SONG
    SET total_play = total_play + 1
    WHERE id_konten = ${id_konten}
    `;
}

// Insert Section

export async function   handleAddSong(formData: FormData) {
    const id_konten = formData.get("song")! as string;
    var id_playlist;
    var id_user_playlist;
    var submit;
    if (formData.has("id")) {
        const id = formData.get("id")! as string;
        id_playlist = id.split('_')[0];
        id_user_playlist = id.split('_')[1];
    } else {
        id_playlist = formData.get("id_playlist")! as string;
        id_user_playlist = formData.get("id_user_playlist")! as string;
    }

    try {
        await sql`
        INSERT INTO PLAYLIST_SONG (id_playlist, id_song) VALUES (${id_playlist}, ${id_konten})
        `
        console.log('addsongsuccess');
        submit = "success";
    } catch {
        console.log('addsongfailed');
        submit = "error";
    }
    redirect('/playlist/kelolapl/playlistdetail?id_user_playlist='+ id_user_playlist +'&id_playlist=' + id_playlist + '&submit=' + submit)

}

export async function handleAddPlaylist(formData: FormData) {
    const judul = formData.get("judul")! as string;
    const deskripsi = formData.get("deskripsi")! as string;
    if (judul == "" || deskripsi == "") {
        throw new Error('Kolom judul / Deskrispi kosong')
    }
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
    console.log('Add Playlist Success')
}

export async function handleAddDownloadedSong(email: string, id_song: string) { 
    await sql`
    INSERT INTO DOWNLOADED_SONG (id_song, email_downloader) VALUES (${id_song}, ${email})
    `;
}

export async function handleEntryAkunPlayPlaylist( email:string, id_user_playlist:string) {
    const email_pembuat = await sql`
    SELECT email_pembuat FROM user_playlist
    WHERE id_user_playlist = ${id_user_playlist}
    `;
    const timestamp = new Date().toISOString();
    await sql`
    INSERT INTO AKUN_PLAY_USER_PLAYLIST (email_pemain, id_user_playlist, email_pembuat, waktu) VALUES (${email}, ${id_user_playlist}, ${email_pembuat.rows[0].email_pembuat}, ${timestamp})
    `;
}