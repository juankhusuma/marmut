'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function downloadsong() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const id_konten = searchParams.get('id_konten');
    const judul = searchParams.get('judul');

    if (typeof window !== 'undefined') {
        var emailuser = localStorage.getItem("email");
    }
    
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