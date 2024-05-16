'use client';

import { handleDeletePlaylist, handleDeleteSong, handlePlaylistDTL, handleSongPlaylist } from "@/action/handleUserPlaylist";
import { triggerToast } from "@/utils/toast";
import { UUID } from "crypto";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type playlist = {
    judul: string
    nama_pembuat: string
    jumlah_lagu: number
    total_durasi: number
    tanggal_dibuat: Date
    deskripsi: string
}

type song = {
    judul: string
    nama: string
    durasi: number
    id_konten: UUID
}

export default function playlistdetail() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const id_user_playlist = searchParams.get('id_user_playlist');
    const id_playlist = searchParams.get('id_playlist');
    const [data, setData] = useState<playlist>();
    const [datamusic, setDatamusic] = useState<Array<song>>();

    useEffect(() => {
        handlePlaylistDTL(id_user_playlist).then(res => {
            if (res.rowCount != 0){
                setData(JSON.parse(JSON.stringify(res.rows[0])));
            }
        });
        handleSongPlaylist(id_playlist).then(res => {
            if (res.rowCount != 0){
                let allRows = [];
                for (let i = 0; i < res.rowCount; i++) {
                    allRows.push(JSON.parse(JSON.stringify(res.rows.at(i))));
                }
                setDatamusic(allRows);
            }
        });
    }, [])

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

    async function handleClickDelete( id_playlist:string, id_konten:string ) {
        try {
            await handleDeleteSong(id_playlist, id_konten);
        } catch {
            triggerToast("error", "Delete Song failure!");
            return;
        }
        triggerToast("success", "Song has successfull deleted!")
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    }
    
    async function handleClickAddMusic( id_playlist: string, id_user_playlist: string) {
        router.push(pathname + `/../addsong` + `?` + createQueryString2(['id_playlist', 'id_user_playlist'], [id_playlist, id_user_playlist]));
    }

    async function handleClickMusic( id_konten: string ) {
        router.push(pathname + `/../../playsong` + `?` + createQueryString('id_konten', id_konten));
    }

    async function handleClickShuffle(id_user_playlist: string, id_playlist: string) {
        router.push(pathname + `/../../playup` + `?` + createQueryString2(['id_user_playlist', 'id_playlist'], [id_user_playlist, id_playlist]));
    }

    return (
        <div className="flex flex-col p-10 space-y-5">
            <h1 className="text-3xl font-bold text-center">User Playlist Detail</h1>
            <div>
                <p>Judul: {data?.judul}</p>
                <p>Pembuat: {data?.nama_pembuat}</p>
                <p>Jumlah lagu: {data?.jumlah_lagu}</p>
                <p>Total Durasi: {data?.total_durasi}</p>
                <p>Tanggal Dibuat: {data?.tanggal_dibuat.toString()}</p>    
                <p>Deskripsi: {data?.deskripsi}</p>
            </div>
            <a onClick={() => {handleClickShuffle(id_user_playlist!, id_playlist!)}} className="text-center">Shuffle Play</a>
            <a onClick={() => {router.push(pathname + `/../`)}} className="text-center">Kembali</a>
            <h1 className="text-center">Daftar Lagu</h1>
            <div className="overflow-y-auto h-96">
                <table className="table table-zebra table-auto w-full">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2">Judul Lagu</th>
                            <th className="px-4 py-2">Oleh</th>
                            <th className="px-4 py-2">Durasi</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datamusic?.map((row, index) => (
                            <tr key={index} className="bg-black-200">
                                <th className="border px-4 py-2">{row.judul}</th>
                                <th className="border px-4 py-2">{row.nama}</th>
                                <th className="border px-4 py-2">{row.durasi}</th>
                                <th className="border px-4 py-2">
                                <div className="flex flex-col">
                                    <a onClick={ () => handleClickMusic(row.id_konten)}>[Lihat]</a>
                                    <a>[Play]</a>
                                    <a onClick={ () => handleClickDelete(id_playlist!, row.id_konten)}>[Hapus]</a>
                                </div>
                            </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <a onClick={ () => handleClickAddMusic(id_playlist!, id_user_playlist!)} className="btn btn-primary">Tambah Lagu</a>
        </div>
    )
};