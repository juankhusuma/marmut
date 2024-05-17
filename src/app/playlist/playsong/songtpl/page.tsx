'use client';

import { handleAddSong, handleSongDetails, handleUserPL } from "@/action/handleUserPlaylist";
import { triggerToast } from "@/utils/toast";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import addsongtopl from "../../kelolapl/addsong/page";

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
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const id_konten = searchParams.get('id_konten');
    const [dataMusic, setDataMusic] = useState<music>();
    const [value, setValue] = useState<string>("b");
    const [dataPL, setDataPL] = useState<Array<user_playlist>>();

    if (typeof window !== 'undefined') {
        var emailuser = localStorage.getItem("email");
    }

    useEffect(() => {
        handleSongDetails(id_konten).then(res => {
            setDataMusic(JSON.parse(JSON.stringify(res.rows[0])));  
        });
        handleUserPL(emailuser).then(res => {
            if (res.rowCount != 0){
                let allRows = [];
                for (let i = 0; i < res.rowCount; i++) {
                    allRows.push(JSON.parse(JSON.stringify(res.rows.at(i))));
                }
                setDataPL(allRows);
            }
        })
    },[])

    const createQueryString = useCallback(
        (name: string, value: string) => {
          const params = new URLSearchParams()
          params.set(name, value)
     
          return params.toString()
        },
        [searchParams]
    )

    const createQueryString2 = useCallback(
        (name: Array<string>, value: Array<string>) => {
          const params = new URLSearchParams()
          params.set(name[0], value[0])
          for (let index = 1; index < name.length; index++) {
            params.append(name[index], value[index])
          }
     
          return params.toString()
        },
        [searchParams]
    )
    
    return (
        <div className="container mx-auto p-4">
            <form className="max-w-sm mx-auto" action={handleAddSong}>
            <h1 className="text-2xl font-bold mb-2">Add Song to User Playlist</h1>
            <h1 className="text-1xl font-normal mb-2">Judul: {dataMusic?.judul_music}</h1>
            <h1 className="text-1xl font-normal mb-4">Artist: {dataMusic?.nama_artist}</h1>
            <select id="id" name="id" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="" disabled selected>Choose a playlist</option>
                {dataPL?.map((row, index) => (
                    <option key={index} value={row.id_playlist + '-' + row.id_user_playlist}>{row.judul}</option>
                ))}
            </select>
            <div className="flex justify-center mt-32">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Tambah
                </button>
            </div>
            <div className="flex justify-center mt-1">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Kembali
                </button>
            </div>
            <div className="invisible">
                <label htmlFor="id_playlist"></label>
                <input name="song" id="song" type="text" value={dataMusic?.id_konten}></input>
            </div>
            </form>
        </div>
    )
}