'use client';

import { handleEntryAkunPlayPlaylist, handlePlaylistDTL, handleSongPlaylist } from "@/action/handleUserPlaylist";
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
    id_konten: string
}

export default function ViewPlayListPage() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const id_user_playlist = searchParams.get('id_user_playlist')! as string;
    const id_playlist = searchParams.get('id_playlist')! as string;
    const [data, setData] = useState<playlist>();
    const [datamusic, setDatamusic] = useState<Array<song>>();

    if (typeof window !== 'undefined') {
        var emailuser = localStorage.getItem("email");
    }

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

    async function handleClickMusic( id_konten: string ) {
        router.push(pathname + `/../playsong` + `?` + createQueryString('id_konten', id_konten));
    }

    async function handleShufflePlay() {
        handleEntryAkunPlayPlaylist(emailuser!, id_user_playlist)
    }

    function durasiToHourMinutes( durasi:number ){
        return ((durasi-(durasi%60))/60) + ' Hour ' + (durasi%60) + ' Minutes';
    }
    
    return (
        <div className="flex flex-col p-10 space-y-5">
            <h1 className="text-3xl font-bold text-center">User Playlist Detail</h1>
            <div>
                <p>Judul: {data?.judul}</p>
                <p>Pembuat: {data?.nama_pembuat}</p>
                <p>Jumlah lagu: {data?.jumlah_lagu}</p>
                <p>Total Durasi: {durasiToHourMinutes(data?.total_durasi!)}</p>
                <p>Tanggal Dibuat: {data?.tanggal_dibuat.toString().split('T')[0]}</p>
                <p>Deskripsi: {data?.deskripsi}</p>
            </div>
            <a onClick={handleShufflePlay} className="text-center">Shuffle Play</a>
            <a onClick={() => {router.back()}} className="text-center">Kembali</a>
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
                                <th className="border px-4 py-2">{durasiToHourMinutes(row.durasi)}</th>
                                <th className="border px-4 py-2">
                                <div className="flex flex-col">
                                    <a onClick={ () => handleClickMusic(row.id_konten)}>[Lihat]</a>
                                    <a onClick={ () => handleClickMusic(row.id_konten)}>[Play]</a>
                                </div>
                            </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}