'use client';

import { handleUserPL } from "@/action/handleUserPlaylist";

export default function KelolaPlaylistPage() {
    if (true) {
        return (
            <div className="flex-col p-10 space-y-10">
                <h1 className="text-3xl font-bold text-center">User Playlist</h1>
                <div className="overflow-y-auto h-96">
                    <table className="table table-pin-rows">
                        <thead>
                            <tr>
                                <th>Judul</th>
                                <th>Jumlah Lagu</th>
                                <th>Total Durasi</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="overflow-y-scroll">
                            <tr>
                                <th>MySong</th>
                                <th>10</th>
                                <th>1 Hours 3 Minutes</th>
                                <th className="flex flex-col">
                                    <a href="#" className="">Detail</a>
                                    <a href="#">Ubah</a>
                                    <a href="#">Hapus</a>
                                </th>
                            </tr>
                            <tr>
                                <th>MySong</th>
                                <th>10</th>
                                <th>1 Hours 3 Minutes</th>
                                <th className="flex flex-col">
                                    <a href="#" className="">Detail</a>
                                    <a href="#">Ubah</a>
                                    <a href="#">Hapus</a>
                                </th>
                            </tr>
                            <tr>
                                <th>MySong</th>
                                <th>10</th>
                                <th>1 Hours 3 Minutes</th>
                                <th className="flex flex-col">
                                    <a href="#" className="">Detail</a>
                                    <a href="#">Ubah</a>
                                    <a href="#">Hapus</a>
                                </th>
                            </tr>
                            <tr>
                                <th>MySong</th>
                                <th>10</th>
                                <th>1 Hours 3 Minutes</th>
                                <th className="flex flex-col">
                                    <a href="#" className="">Detail</a>
                                    <a href="#">Ubah</a>
                                    <a href="#">Hapus</a>
                                </th>
                            </tr>
                            <tr>
                                <th>MySong</th>
                                <th>10</th>
                                <th>1 Hours 3 Minutes</th>
                                <th className="flex flex-col">
                                    <a href="#" className="">Detail</a>
                                    <a href="#">Ubah</a>
                                    <a href="#">Hapus</a>
                                </th>
                            </tr>
                            <tr>
                                <th>MySong</th>
                                <th>10</th>
                                <th>1 Hours 3 Minutes</th>
                                <th className="flex flex-col">
                                    <a href="#" className="">Detail</a>
                                    <a href="#">Ubah</a>
                                    <a href="#">Hapus</a>
                                </th>
                            </tr>
                            <tr>
                                <th>MySong</th>
                                <th>10</th>
                                <th>1 Hours 3 Minutes</th>
                                <th className="flex flex-col">
                                    <a href="#" className="">Detail</a>
                                    <a href="#">Ubah</a>
                                    <a href="#">Hapus</a>
                                </th>
                            </tr>
                            <tr>
                                <th>MySong</th>
                                <th>10</th>
                                <th>1 Hours 3 Minutes</th>
                                <th className="flex flex-col">
                                    <a href="#" className="">Detail</a>
                                    <a href="#">Ubah</a>
                                    <a href="#">Hapus</a>
                                </th>
                            </tr>
                            <tr>
                                <th>MySong</th>
                                <th>10</th>
                                <th>1 Hours 3 Minutes</th>
                                <th className="flex flex-col">
                                    <a href="#" className="">Detail</a>
                                    <a href="#">Ubah</a>
                                    <a href="#">Hapus</a>
                                </th>
                            </tr>
                            <tr>
                                <th>MySong</th>
                                <th>10</th>
                                <th>1 Hours 3 Minutes</th>
                                <th className="flex flex-col">
                                    <a href="#" className="">Detail</a>
                                    <a href="#">Ubah</a>
                                    <a href="#">Hapus</a>
                                </th>
                            </tr>
                            <tr>
                                <th>MySong</th>
                                <th>10</th>
                                <th>1 Hours 3 Minutes</th>
                                <th className="flex flex-col">
                                    <a href="#" className="">Detail</a>
                                    <a href="#">Ubah</a>
                                    <a href="#">Hapus</a>
                                </th>
                            </tr>
                            <tr>
                                <th>MySong</th>
                                <th>10</th>
                                <th>1 Hours 3 Minutes</th>
                                <th className="flex flex-col">
                                    <a href="#" className="">Detail</a>
                                    <a href="#">Ubah</a>
                                    <a href="#">Hapus</a>
                                </th>
                            </tr>
                            <tr>
                                <th>MySong</th>
                                <th>10</th>
                                <th>1 Hours 3 Minutes</th>
                                <th className="flex flex-col">
                                    <a href="#" className="">Detail</a>
                                    <a href="#">Ubah</a>
                                    <a href="#">Hapus</a>
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button className="btn btn-circle">+</button>
            </div>
        )
    } else {
        return (
            <div className="flex-col p-10 space-y-10">
                <h1 className="text-3xl font-bold text-center">User Playlist</h1>
                <h1 className="text-3xl font-light text-center">Anda belum memiliki playlist</h1>
                <button className="btn btn-circle">+</button>
            </div>
        )
    }
}