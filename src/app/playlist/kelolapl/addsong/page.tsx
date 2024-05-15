'use client';

import { handleAddSong, handleListSong } from "@/action/handleAddSong";
import { triggerToast } from "@/utils/toast";
import { UUID } from "crypto";
import router from "next/router";
import { FormEvent, useEffect, useState } from "react";

const myState = history.state;

type song = {
    id_konten: UUID
    judul: String
    nama: String
}

export default function addsongtopl() {
    const [routeState, setRouteState] = useState({});
    const [dataMusic, setDataMusic] = useState<Array<song>>();
    const [value, setValue] = useState("b");

    async function addSongtoPlaylist() {
        if (value != "b") { 
            setRouteState(myState);
            try {
                await handleAddSong(value, myState.id_playlist);
            } catch {
                triggerToast("error", "Adding Playlist failure!");
                return;
            }
            triggerToast("success", "Playlist has successfull added!");
            router.push('playlist/kelolapl');
        }
    }

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
    
    return (
        <form className="max-w-sm mx-auto" onSubmit={addSongtoPlaylist}>
        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tambah Lagu</label>
        <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={value} onChange={(e) => {
            setValue(e.target.value);
        }}>
            <option selected>Choose a song</option>
            {dataMusic?.map((row, index) => (
                <option value={row.id_konten}>{row.judul} - {row.nama}</option>
            ))}
        </select>
        <button className="btn btn-primary" type="submit">Submit</button>
        </form>
    )
}