"use server"

import Link from 'next/link';
import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from 'next/cache';
import { handleDeleteAlbum } from "@/action/handleDeleteAlbum";
import { checkUser } from "@/action/checkUser";

export default async function AlbumListUser() {
  noStore();

  const user = await checkUser();
  const isLabel = user?.roles.includes("LABEL");
  const isArtist = user?.roles.includes("ARTIST");
  const isSongwriter = user?.roles.includes("SONGWRITER");

  if (isLabel) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="bg-white p-6 rounded-lg shadow-lg text-gray-900 max-w-md w-full">
          <h3 className="text-lg font-semibold text-center mb-4">Access Denied</h3>
          <p className="text-center">You are not allowed to access this page!</p>
        </div>
      </div>
    );
  }

  let albums : any;

  if (isArtist){
    const result = await sql`
    SELECT al.judul, la.nama, al.jumlah_lagu, al.total_durasi from song s join artist a on s.id_artist = a.id
    join album al on al.id = s.id_album join label la on la.id = al.id_label
    WHERE a.email_akun = ${user?.email}
    group by (al.judul, la.nama, al.jumlah_lagu, al.total_durasi)
    `;
    albums = result.rows;
  }

  if(isSongwriter){
    const result = await sql`
    SELECT al.judul, la.nama, al.jumlah_lagu, al.total_durasi from song s join songwriter_write_song sow on sow.id_song = s.id_konten
    join songwriter so on sow.id_songwriter = so.id
    join album al on al.id = s.id_album join label la on la.id = al.id_label
    WHERE so.email_akun = ${user?.email}
    group by (al.judul, la.nama, al.jumlah_lagu, al.total_durasi)
    `;
    albums = result.rows;
  }

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
                    Label
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
                {albums?.map((album : any) => (
                  <tr key={album.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{album.judul}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{album.nama}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{album.jumlah_lagu}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{album.total_durasi}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link href={`/album-song/user/${album.id}`}>
                        <button className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded mr-2">
                          Lihat Daftar Lagu
                        </button>
                      </Link>
                      <Link href={`/create-song/${album.id}`}>
                        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-2">
                          Tambah Lagu
                        </button>
                      </Link>
                      <form action={handleDeleteAlbum}>
                        <input type="hidden" name="id" value={album.id} />
                        <button type="submit" className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
                          Hapus
                        </button>
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
