'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function successadd() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const judul_music = searchParams.get('judul_music')! as string;
    const judul_album = searchParams.get('judul_album')! as string;

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
    
    return (
        <div className="flex flex-col justify-center items-center p-10 space-y-1">
            <h1 className="text-3xl font-bold text-center">Berhasil menambahkan Lagu dengan judul {judul_music} ke {judul_album}!</h1>
            <br />
            <a onClick={ () => {
                router.replace('../kelolapl');
            }}>Ke Playlist</a>
            <a onClick={ () => {
                router.push(pathname + `/../` + `?` + createQueryString('id_konten', 'd54ff0eb-3246-4ee1-b73c-9125909e9b42'));
            }}>Kembali</a>
        </div>
    )
}