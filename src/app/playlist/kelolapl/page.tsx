"use client";

import { handleUserPL } from "@/action/handleUserPlaylist";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type userpl = {
    judul: string
    jumlah_lagu: number
    total_durasi: number
}

<<<<<<< HEAD
export default function KelolaPlaylistPage() {
=======
export default function kelolapl() {
    const router = useRouter();
    const [data, setData] = useState<Array<userpl>>();
    if (typeof window !== 'undefined') {
        var emailuser = localStorage.getItem("email");
    }
    useEffect(() => {
        handleUserPL(emailuser).then(res => {
            if (res.rowCount != 0){
                let allRows = [];
                for (let i = 0; i < res.rowCount; i++) {
                    allRows.push(JSON.parse(JSON.stringify(res.rows.at(i))));
                }
                setData(allRows);
            }
        });
    }, [])

>>>>>>> ca1178e (Update Front-end Kelola Playlist, Play Song, And Play User Playlist)
    if (true) {
        return (
            <div className="container mx-auto px-4">
                <div className="flex flex-col min-h-screen">
                    <div className="text-center mt-5 space-y-5">
                        <h1 className="text-3xl font-bold">User Playlist</h1>
                    </div>

                    <div className="mt-5 mb-96">
                    <table className="table-auto w-full">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2">Judul</th>
                                <th className="px-4 py-2">Jumlah Lagu</th>
                                <th className="px-4 py-2">Total Durasi</th>
                                <th className="px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody className="overflow-y-scroll">
                            {/* {data.map((row, index) => (
                                <tr key={index} className="bg-black-200">
                                    <td className="border px-4 py-2">{row.judul}</td>
                                    <td className="border px-4 py-2">{row.jumlah_lagu}</td>
                                    <td className="border px-4 py-2">{row.total_durasi} Minutes</td>
                                    <td className="border px-4 py-2"></td>
                                </tr>
                            ))} */}
                            <tr className="bg-black-200">
                                <td className="border px-4 py-2">MyFSong</td>
                                <td className="border px-4 py-2">5</td>
                                <td className="border px-4 py-2">10 Minutes</td>
                                <td className="border px-4 py-2">[Detail]<br />[Ubah]<br />[Hapus]</td>
                            </tr>
                        </tbody>
                    </table>
                    </div>

                    <div className="mt-8 mb-5 self-start">
                        <button className="btn btn-circle bg-blue-500 hover:bg-blue-700 py-2 px-4">
                            <svg className="h-8 w-8 text-white-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <line x1="12" y1="5" x2="12" y2="19" />  <line x1="5" y1="12" x2="19" y2="12" /></svg>
                        </button>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="container mx-auto px-4">
                <div className="flex flex-col min-h-screen">
                    <div className="text-center mt-5 mb-96 space-y-5">
                        <h1 className="text-3xl font-bold">User Playlist</h1>
                        <h1 className="text-2xl font-normal">Anda belum memiliki playlist</h1>
                    </div>

                    <div className="mt-32 mb-5 self-start">
                        <button className="btn btn-circle bg-blue-500 hover:bg-blue-700 py-2 px-4">
                            <svg className="h-8 w-8 text-white-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <line x1="12" y1="5" x2="12" y2="19" />  <line x1="5" y1="12" x2="19" y2="12" /></svg>
                        </button>
                    </div>
                </div>
                </div>
        )
    }
}