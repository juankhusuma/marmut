'use client';

import React, { FormEvent, useEffect, useState } from "react";
import { triggerToast } from "@/utils/toast";
import { useRouter, useSearchParams } from "next/navigation";
import { handleChangePlaylist, handlePlaylistchange } from "@/action/handleUserPlaylist";

type user_playlist = {
    id_user_playlist: string
    judul: string
    deskripsi: string
}

export default function changeplaylist() {
    const [datapl, setDatapl] = useState<user_playlist>();
    const router = useRouter();
    const searchParams = useSearchParams();
    const id_user_playlist = searchParams.get('id_user_playlist');

    useEffect(() => {
        handlePlaylistchange(id_user_playlist).then(res => {
            if (res.rowCount != 0) {
                setDatapl(JSON.parse(JSON.stringify(res.rows[0])));
            }
        });
    }, [])

    async function changePlaylisttoDatabase(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        formData.append('id_user_playlist', id_user_playlist!)
        try {
            await handleChangePlaylist(formData);
        } catch {
            triggerToast("error", "Change Playlist failure!");
            return;
        }
        triggerToast("success", "Playlist has successfull Changed!");
        router.replace('../kelolapl');
    }

    return (
        <div className="flex flex-col justify-center items-center space-y-5">
            <form onSubmit={changePlaylisttoDatabase} className="form-control w-1/3">
                <h1 className="text-3xl font-bold text-center">Ubah Playlist</h1>
                <div className="flex flex-col">
                    <label htmlFor="email" className="label-text">Judul</label>
                    <input className="input-sm input-primary mb-2" type="text" name="judul" defaultValue={datapl?.judul} />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="email" className="label-text">Deskripsi</label>
                    <input className="input-sm input-primary mb-2" type="text" name="deskripsi" defaultValue={datapl?.deskripsi} />
                </div>
                <button className="btn btn-primary" type="submit">Submit</button>
            </form>
        </div>
    )
}