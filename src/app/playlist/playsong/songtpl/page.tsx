'use client';

import { handleAddSong, handleSongDetails, handleUserPL } from "@/action/handleUserPlaylist";
import { triggerToast } from "@/utils/toast";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type music = {
    judul_music: string
    nama_artist: string
    durasi: number
    tanggal_rilis: Date
    tahun: number
    total_play: number
    total_download: number
    judul_album: string
    id_konten: string
}

type user_playlist = {
    email_pembuat: string
    id_user_playlist: string
    judul: string
    deskripsi: string
    jumlah_lagu: number
    tanggal_dibuat: Date
    id_playlist: string
    total_durasi: number
}

export default function songtopl() {
    return (
        <div className="flex flex-col justify-center items-center p-10 space-y-1">
            <h1 className="text-3xl font-bold">Add Song To User Playlist</h1>
            <p>Judul: Song1</p>
            <p>Artist: Artist1</p>
            <div>
                <form className="form-control">
                    <label htmlFor="Playlist">Playlist:</label>
                    <select name="playlist" id="pl">
                        <option value="pl1">Playlist1</option>
                        <option value="pl2">Playlist2</option>
                        <option value="pl3">Playlist3</option>
                        <option value="pl4">Playlist4</option>
                    </select>
                </form>
            </div>
            <br />
            <a href="#">Tambah</a>
            <a href="#">Kembali</a>
        </div>
    )
}