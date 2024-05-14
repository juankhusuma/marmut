'use client';

import { triggerToast } from "@/utils/toast";

export default function songtopl() {
    function addsongsuccess() {
        triggerToast("success", "Berhasil Menambahkan Lagu");
    }
    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col items-center">
                <h1 className="text-2xl font-bold mb-2">Add Song to User Playlist</h1>
                <h1 className="text-1xl font-normal mb-2">Judul: Song1</h1>
                <h1 className="text-1xl font-normal mb-4">Artist: Artist1</h1>
                <div className="relative mb-4">
                <button className="bg-gray-300 text-gray-700 font-semibold py-2 px-8 rounded inline-flex items-center">
                    <span>Pilih User Playlist</span>
                    <svg className="fill-current w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M5.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615l-4.415 4.242c-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335l-4.413-4.242c-0.41-0.418-0.436-1.17 0-1.615z"/>
                    </svg>
                </button>
                <ul className="absolute text-gray-700 pt-1">
                    <li className=""><a className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-20 block whitespace-no-wrap" href="#">Playlist1</a></li>
                    <li className=""><a className="bg-gray-200 hover:bg-gray-400 py-2 px-20 block whitespace-no-wrap" href="#">Playlist2</a></li>
                    <li className=""><a className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-20 block whitespace-no-wrap" href="#">Playlist3</a></li>
                </ul>
                </div>
            </div>

            <div className="flex justify-center mt-32">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={addsongsuccess}>
                Tambah
                </button>
            </div>
            <div className="flex justify-center mt-1">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Kembali
                </button>
            </div>
        </div>
    )
}