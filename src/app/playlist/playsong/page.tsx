'use client';

import { handleSongWriter, handleAddDownloadedSong, handleSongDetails, handleSongGenre, isDownloaded } from "@/action/handleUserPlaylist";
import { triggerToast } from "@/utils/toast";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { use, useCallback, useEffect, useState } from "react";

type music = {
    judul_music: string
    nama_artist: string
    durasi: number
    tanggal_rilis: Date
    tahun: number
    total_play: number
    total_download: number
    judul_album: string
    id_konten: string
}

type genre = {
    genre: string
}

type writer = {
    nama: string
}

export default function playsong() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const id_konten = searchParams.get('id_konten');
    const [dataMusic, setDataMusic] = useState<music>();
    const [dataGenre, setDataGenre] = useState<Array<genre>>();
    const [dataWriter, setDataWriter] = useState<Array<writer>>();

    if (typeof window !== 'undefined') {
        var emailuser = localStorage.getItem("email");
    }

    useEffect (() => {
        handleSongDetails(id_konten).then(res => {
            setDataMusic(JSON.parse(JSON.stringify(res.rows[0])));
        });
        handleSongGenre(id_konten).then(res => {
            if (res.rowCount != 0){
                let allRows = [];
                for (let i = 0; i < res.rowCount; i++) {
                    allRows.push(JSON.parse(JSON.stringify(res.rows.at(i))));
                }
                setDataGenre(allRows);
            }
        });
        handleSongWriter(id_konten).then(res => {
            if (res.rowCount != 0){
                let allRows = [];
                for (let i = 0; i < res.rowCount; i++) {
                    allRows.push(JSON.parse(JSON.stringify(res.rows.at(i))));
                }
                setDataWriter(allRows);
            }
        });
    },[])

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

    async function handleClickSongtoPL(id_konten: string) {
        router.push(pathname + `/songtpl` + `?` + createQueryString('id_konten', id_konten));
    }

    async function handleClickDownload(id_konten: string, judul: string) {
        if ((await isDownloaded(emailuser!, id_konten!)).rows[0]['exists']) {  
            triggerToast('error', 'Music have been Downloaded!');
        } else {
            handleAddDownloadedSong(emailuser!, id_konten!)
            router.push(pathname + `/downloadsong` + `?` + createQueryString2(['id_konten', 'judul'], [id_konten, judul]));
        }
    }
    
    return (
        <div className="flex flex-col p-10 space-y-5">
            <h1 className="text-3xl font-bold text-center">Song Detail</h1>
            <div>
                <p>Judul: {dataMusic?.judul_music}</p>
                <p>Genre(s):</p>
                <ul>
                    {dataGenre?.map((row, index) => (
                        <li key={index}>-   {row.genre}</li>
                    ))}
                </ul>
                <p>Artist: {dataMusic?.nama_artist}</p>
                <p>Song Writer(s):</p>
                <ul>
                    {dataWriter?.map((row, index) => (
                        <li key={index}>-   {row.nama}</li>
                    ))}
                </ul>
                <p>Durasi: {dataMusic?.durasi}</p>
                <p>Tanggal Rilis: {dataMusic?.tanggal_rilis.toString()}</p>
                <p>Tahun: {dataMusic?.tahun}</p>
                <p>Total Play: {dataMusic?.total_play}</p>
                <p>Total Downloads: {dataMusic?.total_download}</p>
                <p>Album: {dataMusic?.judul_album}</p>
            </div>
            <input id="playbar" type="range" defaultValue={0} className="mx-96" />
            <a href="#" className="text-center">[Play]</a>
            <a onClick={() => {handleClickSongtoPL(dataMusic!.id_konten)}} className="text-center">[Add to Playlist]</a>
            <a onClick={ () => {handleClickDownload(dataMusic!.id_konten, dataMusic!.judul_music)}} className="text-center">[Download]</a>
            <a onClick={ () => {
                router.replace('../kelolapl');
            }} className="text-center">[Kembali]</a>
        </div>
        
    )
}