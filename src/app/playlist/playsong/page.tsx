'use client';

import { triggerToast } from "@/utils/toast";

export default function playsong() {
    function downloadsongsuccess() {
        triggerToast("success", "Berhasil Mendownload Lagu");
    }
    return (
        <div className="flex flex-col p-10 space-y-5">
            <h1 className="text-3xl font-bold text-center">Song Detail</h1>
            <div>
                <p>Judul: Playlist1</p>
                <p>Genre(s):</p>
                <ul>
                    <li>-   Genre1</li>
                    <li>-   Genre2</li>
                </ul>
                <p>Artist: Artist1</p>
                <p>Song Writer(s):</p>
                <ul>
                    <li>-   Songwriter1</li>
                    <li>-   Songwriter2</li>
                </ul>
                <p>Durasi: 3 menit</p>
                <p>Tanggal Rilis: 18/03/24</p>
                <p>Tahun: 2024</p>
                <p>Total Play: 0</p>
                <p>Total Downloads: 0</p>
                <p>Album: Album1</p>
            </div>
            <input type="range" className="mx-96" />
            <a href="#" className="text-center">[Play]</a>
            <a href="#" className="text-center">[Add to Playlist]</a>
            <a href="#" className="text-center" onClick={downloadsongsuccess}>[Download]</a>
            <a href="#" className="text-center">[Kembali]</a>
        </div>
        
    )
}