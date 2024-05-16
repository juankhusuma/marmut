'use client';

import { handleAddSong, handleListSong } from "@/action/handleUserPlaylist";
import { triggerToast } from "@/utils/toast";
import { UUID } from "crypto";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import playlistdetail from "../playlistdetail/page";

type song = {
    id_konten: UUID
    judul: String
    nama: String
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

    async function addSongtoPlaylist( value: string, id_playlist: string, id_user_playlist: string) {
        if (value != "b") {
            handleAddSong(value, id_playlist).then(res => {
                if (res == 'failed') {
                    triggerToast("error", "Adding Song failure!");
                    setTimeout(() => {
                        return;
                    }, 2000)
                } else {
                    triggerToast("success", "Song has successfull added!");
                    setTimeout(() => {
                        router.push(pathname + `/../playlistdetail` + `?` + createQueryString2(['id_playlist', 'id_user_playlist'], [id_playlist, id_user_playlist]));
                    }, 2000);
                }
            });
        } else {
            triggerToast("error", "No songs selected!");
            setTimeout(() => {
                return;
            }, 2000)
        }
    }
    
    return (
        <form className="max-w-sm mx-auto" onSubmit={ () => addSongtoPlaylist(value, id_playlist!, id_user_playlist!)}>
        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tambah Lagu</label>
        <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={value} onChange={(e) => {
            setValue(e.target.value);
        }}>
            <option defaultValue={"b"}>Choose a song</option>
            {dataMusic?.map((row, index) => (
                <option key={index} value={row.id_konten}>{row.judul} - {row.nama}</option>
            ))}
        </select>
        <button className="btn btn-primary" type="submit">Submit</button>
        </form>
    )
}