'use client';

import { handleDownloadSong } from "@/action/handleUserPlaylist";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function downloadsong() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const id_konten = searchParams.get('id_konten');
    const judul = searchParams.get('judul');

    if (typeof window !== 'undefined') {
        var emailuser = localStorage.getItem("email");
    }

    useEffect(() => {
        handleDownloadSong(emailuser!, id_konten!)
    },[])
    
    return (
        <div className="flex flex-col justify-center items-center p-10 space-y-1">
            <h1 className="text-3xl font-bold text-center">Berhasil mengunduh Lagu dengan judul {judul}!</h1>
            <br />
            <a href="#">Ke Daftar Download</a>
            <a onClick={ () => {
                router.replace('../kelolapl');
            }}>Kembali</a>
        </div>
    )
}