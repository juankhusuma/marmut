"use server"

import Link from 'next/link';
import { sql } from "@vercel/postgres";
import {unstable_noStore as noStore} from 'next/cache'


export default async function AlbumListUser() {

  noStore();
  const result = await sql `SELECT id, judul, jumlah_lagu, total_durasi
  from album`;
  const album = result.rows;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-auto">
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 text-center">LIST ALBUM</h3>
          </div>
          <div className="border-t border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-deep-blue">
                <tr>
                  <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                    Judul
                  </th>
                  <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                    Jumlah Lagu
                  </th>
                  <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                    Total Durasi
                  </th>
                  <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-center">
                {album.map((album) => (
                  <tr key={album.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{album.judul}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{album.jumlah_lagu}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{album.total_durasi}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link href={`/album-song/user/albumdetails/${album.judul}`}>
                        <button className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded mr-2">
                          Lihat Daftar Lagu
                        </button>
                      </Link>
                      <Link href={`/create-song/${album.id}`}>
                        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-2">
                          Tambah Lagu
                        </button>
                      </Link>
                      <a href="#" className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">Hapus</a>
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
