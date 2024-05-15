'use client';

import { handlePlaylistDTL, handleSongPlaylist } from "@/action/handlePlaylistDetail";
import { UUID } from "crypto";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const myState = history.state;

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
}

export default function playlistdetail() {
    const [routeState, setRouteState] = useState({});
    const [data, setData] = useState<playlist>();
    const [dataMusic, setDataMusic] = useState<Array<song>>();

    const pathname = usePathname();
    const router = useRouter();

    function handleClickAddMusic( id_playlist:UUID ) {
        history.pushState({ id_playlist: id_playlist}, "", pathname + "/addsong")
        router.push("../addsong");
    }

    useEffect(() => {
        setRouteState(myState);
        handlePlaylistDTL(myState.id_user_playlist).then(res => {
            if (res.rowCount != 0){
                setData(JSON.parse(JSON.stringify(res.rows[0])));
            }
        });
        handleSongPlaylist(myState.id_playlist).then(res => {
            if (res.rowCount != 0){
                let allRows = [];
                for (let i = 0; i < res.rowCount; i++) {
                    allRows.push(JSON.parse(JSON.stringify(res.rows.at(i))));
                }
                setDataMusic(allRows);
            }
        });
    }, [])

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
            <a href="#" className="text-center">Shuffle Play</a>
            <a href="#" className="text-center">Kembali</a>
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
                        {dataMusic?.map((row, index) => (
                            <tr key={index} className="bg-black-200">
                                <th className="border px-4 py-2">{row.judul}</th>
                                <th className="border px-4 py-2">{row.nama}</th>
                                <th className="border px-4 py-2">{row.durasi}</th>
                                <th className="border px-4 py-2">
                                <div className="flex flex-col">
                                    <a href="#">[Lihat]</a>
                                    <a href="#">[Play]</a>
                                    <a href="#">[Hapus]</a>
                                </div>
                            </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <a onClick={ () => handleClickAddMusic(myState.id_playlist)} className="btn btn-primary">Tambah Lagu</a>
        </div>
    )
};