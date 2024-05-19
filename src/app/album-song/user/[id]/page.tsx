"use server"

import Link from 'next/link';
import { sql } from "@vercel/postgres";
import { handleDeleteSong } from "@/action/handleDeleteSong";
import { unstable_noStore as noCache } from 'next/cache';

export default async function AlbumUserDetails({ params }: { params: { id: string } }) {
    params.id = decodeURIComponent(params.id);
    console.log(params.id)
    noCache()

    const tampilan = await sql`SELECT judul from album where album.id = ${params.id}`
    const p = tampilan.rows[0]?.judul;
    console.log(p)

    const result = await sql`
    SELECT s.id_konten, k.judul, k.durasi, s.total_play, s.total_download
    FROM song s JOIN album a ON a.id = s.id_album JOIN konten k on s.id_konten = k.id
    WHERE a.id = ${params.id}
    `;
    const songs = result.rows;
    console.log(songs)

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="w-auto">
                <div className="bg-white shadow overflow-hidden rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 text-center">DAFTAR LAGU PADA ALBUM {p}</h3>
                    </div>
                    <div className="border-t border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-deep-blue">
                                <tr>
                                    <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                                        Judul
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                                        Durasi
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                                        Total Play
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                                        Total Download
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 text-center">
                                {songs.map(song => (
                                    <tr key={song.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{song.judul}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{song.durasi}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{song.total_play}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{song.total_download}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Link href={`/playlist/playsong?id_konten=${song.id_konten}`}>
                                                <button className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded mr-2">
                                                    Lihat Details
                                                </button>
                                            </Link>
                                            <form action={handleDeleteSong} method="POST" className="inline">
                                                <input type="hidden" name="id" value={song.id_konten} />
                                                <button type="submit" className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">Hapus</button>
                                            </form>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
