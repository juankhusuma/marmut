'use client';

import { handleAddPlaylist } from "@/action/handleUserPlaylist";
import { FormEvent } from "react";
import { triggerToast } from "@/utils/toast";
import { useRouter } from "next/navigation";

export default function addplaylist() {
    const router = useRouter();
    if (typeof window !== 'undefined') {
        var emailuser = localStorage.getItem("email");
    }

    async function addPlaylisttoDatabase(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        formData.append('email', emailuser!);
        try {
            await handleAddPlaylist(formData);
        } catch {
            triggerToast("error", "Adding Playlist failure!");
            return;
        }
        triggerToast("success", "Playlist has successfull added!");
        router.replace('../kelolapl');
    }

    return (
        <div className="flex flex-col justify-center items-center space-y-5">
            <form onSubmit={addPlaylisttoDatabase} className="form-control w-1/3">
                <h1 className="text-3xl font-bold text-center">Tambah Playlist</h1>
                <div className="flex flex-col">
                    <label htmlFor="email" className="label-text">Judul</label>
                    <input className="input-sm input-primary mb-2" type="text" name="judul" />
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