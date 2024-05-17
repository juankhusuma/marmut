'use client';

import { handleAddSong, handleListSong } from "@/action/handleUserPlaylist";
import { triggerToast } from "@/utils/toast";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useCallback, useEffect, useState } from "react";

type song = {
    id_konten: string
    judul: string
    nama: string
}

export default function addsongtopl() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [dataMusic, setDataMusic] = useState<Array<song>>();
    const [value, setValue] = useState<string>("b");

    const id_playlist = searchParams.get('id_playlist');
    const id_user_playlist = searchParams.get('id_user_playlist');

    useEffect(() => {
        handleListSong().then(res => {
            if (res.rowCount != 0){
                let allRows = [];
                for (let i = 0; i < res.rowCount; i++) {
                    allRows.push(JSON.parse(JSON.stringify(res.rows.at(i))));
                }
                setDataMusic(allRows);
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

    // async function addSongtoPlaylist(e: FormEvent<HTMLFormElement>) {
    //     e.preventDefault();
    //     const formData = new FormData(e.target as HTMLFormElement);
    //     formData.append('id_playlist', id_playlist!);
    //     if (value != "b") {
    //         handleAddSong(formData).then(res => {
    //             if (res == 'failed') {
    //                 triggerToast('error', 'Failed to Add Song!');
    //             } else {
    //                 triggerToast('success', 'Add Song Success!');
    //                 setTimeout(() => {
    //                     router.push(pathname + `/../playlistdetail` + `?` + createQueryString2(['id_playlist', 'id_user_playlist'], [id_playlist!, id_user_playlist!]));
    //                 }, 2000);
    //             }
    //         });
    //     } else {
    //         triggerToast('error', 'No Song Selected');
    //         setTimeout(() => {
    //             return;
    //         }, 2000)
    //     }
    // }
    
    return (
        <form className="flex flex-col space-y-2 justify-items-center items-center" action={handleAddSong}>
            <div className="flex flex-col justify-items-center items-center">
                <label htmlFor="song" className="block mb-2 text-3xl font-bold text-gray-900 dark:text-white">Tambah Lagu</label>
                <select id="song" name="song" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-6/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="" disabled selected>Choose a song</option>
                    {dataMusic?.map((row, index) => (
                        <option key={index} value={row.id_konten}>{row.judul} - {row.nama}</option>
                    ))}
                </select>
            </div>
            <button className="btn btn-primary" type="submit">Submit</button>
            <div className="invisible">
                <label htmlFor="id_playlist"></label>
                <input name="id_playlist" id="id_playlist" type="text" value={id_playlist!}></input>
            </div>
            <div className="invisible">
                <label htmlFor="id_user_playlist"></label>
                <input name="id_user_playlist" id="id_user_playlist" type="text" value={id_user_playlist!}></input>
            </div>
        </form>
    )
}