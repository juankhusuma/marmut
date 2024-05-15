'use client';

import { handleAddPlaylist } from "@/action/handleAddPlaylist";
import { FormEvent, useEffect, useState } from "react";
import { triggerToast } from "@/utils/toast";
import { useRouter } from "next/navigation";
import { UUID } from "crypto";

const myState = history.state;

type userpl = {
    judul: string
    jumlah_lagu: number
    total_durasi: number
    id_user_playlist: UUID
    id_playlist: UUID
}

var user_playlist:userpl;

export default function changeplaylist() {
    const [routeState, setRouteState] = useState({});
    const router = useRouter();
    if (typeof window !== 'undefined') {
        var emailuser = localStorage.getItem("email");
    }

    useEffect(() => {
        setRouteState(myState);
        user_playlist = myState.user_playlist;
    }, [])

    async function changePlaylisttoDatabase(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        formData.append('email', emailuser!);
        try {
            await handleAddPlaylist(formData);
        } catch {
            triggerToast("error", "Change Playlist failure!");
            return;
        }
        triggerToast("success", "Playlist has successfull Changed!");
        router.back();
    }

    return (
        <div className="flex flex-col justify-center items-center space-y-5">
            <form onSubmit={changePlaylisttoDatabase} className="form-control w-1/3">
                <h1 className="text-3xl font-bold text-center">Tambah Playlist</h1>
                <div className="flex flex-col">
                    <label htmlFor="email" className="label-text">Judul</label>
                    <input className="input-sm input-primary mb-2" type="text" name="judul" value={user_playlist.judul}/>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="email" className="label-text">Deskripsi</label>
                    <input className="input-sm input-primary mb-2" type="text" name="deskripsi" />
                </div>
                <button className="btn btn-primary" type="submit">Submit</button>
            </form>
        </div>
    )
}