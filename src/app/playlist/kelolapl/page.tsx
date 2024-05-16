"use client";

import { handleUserPL } from "@/action/handleUserPlaylist";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { UUID } from "crypto";
import { handleDeletePlaylist } from "@/action/handleUserPlaylist";
import { triggerToast } from "@/utils/toast";

type user_playlist = {
    email_pembuat: string
    id_user_playlist: UUID
    judul: string
    deskripsi: string
    jumlah_lagu: number
    tanggal_dibuat: Date
    id_playlist: UUID
    total_durasi: number
}

export default function kelolapl() {
    const [data, setData] = useState<Array<user_playlist>>();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

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

    async function handleClickDetail( id_user_playlist:string, id_playlist:UUID ) {
        router.push(pathname + `/playlistdetail` + `?` + createQueryString2(['id_user_playlist', 'id_playlist'], [id_user_playlist, id_playlist]))
    }

    async function handleClickChange( id_user_playlist:string ) {
        router.push(pathname + `/changeplaylist` + `?` + createQueryString('id_user_playlist', id_user_playlist))
    }

    async function handleClickDelete( id_user_playlist:UUID ) {
        try {
            await handleDeletePlaylist(id_user_playlist);
        } catch {
            triggerToast("error", "Delete Playlist failure!");
            return;
        }
        triggerToast("success", "Playlist has successfull deleted!");
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    }

    if (data != null) {
        return (
            <div className="container mx-auto px-4">
                <div className="flex flex-col min-h-screen">
                    <div className="text-center mt-5 space-y-5">
                        <h1 className="text-3xl font-bold">User Playlist</h1>
                    </div>

                    <div className="mt-5 mb-96">
                    <table className="table-auto w-full">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2">Judul</th>
                                <th className="px-4 py-2">Jumlah Lagu</th>
                                <th className="px-4 py-2">Total Durasi</th>
                                <th className="px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody className="overflow-y-scroll">
                            {data.map((row, index) => (
                                <tr key={index} className="bg-black-200">
                                    <td className="border px-4 py-2">{row.judul}</td>
                                    <td className="border px-4 py-2">{row.jumlah_lagu}</td>
                                    <td className="border px-4 py-2">{row.total_durasi} Minutes</td>
                                    <td className="border px-4 py-2 flex flex-col space-y-2">
                                        <button className="hover:bg-gray-800 py-2 px-4 border border-gray-400 rounded shadow" onClick={ () => handleClickDetail(row.id_user_playlist, row.id_playlist)}>
                                            Detail
                                        </button>
                                        <button className="hover:bg-gray-800 py-2 px-4 border border-gray-400 rounded shadow" onClick={ () => handleClickChange(row.id_user_playlist)}>
                                            Ubah
                                        </button>
                                        <button className="hover:bg-gray-800 py-2 px-4 border border-gray-400 rounded shadow" onClick={ () => handleClickDelete(row.id_user_playlist) }>
                                            Hapus
                                        </button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>

                    <div className="mt-8 mb-5 self-start">
                        <button className="btn btn-circle bg-blue-500 hover:bg-blue-700 py-2 px-4" onClick={ () => router.replace('kelolapl/addplaylist') }>
                            <svg className="h-8 w-8 text-white-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <line x1="12" y1="5" x2="12" y2="19" />  <line x1="5" y1="12" x2="19" y2="12" /></svg>
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
                        <button className="btn btn-circle bg-blue-500 hover:bg-blue-700 py-2 px-4" onClick={ () => router.replace('kelolapl/addplaylist') }>   
                            <svg className="h-8 w-8 text-white-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <line x1="12" y1="5" x2="12" y2="19" />  <line x1="5" y1="12" x2="19" y2="12" /></svg>
                        </button>
                    </div>
                </div>
                </div>
            )
        }
    }