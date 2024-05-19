"use server";

import { handleUserCreateAlbum } from "@/action/handleUserCreateAlbum";
import { sql } from "@vercel/postgres";
import { checkUser } from "@/action/checkUser";
import { unstable_noStore as noStorage } from "next/cache";

export default async function UserCreateAlbumPage() {
    noStorage();
    const result = await sql`SELECT a.id, a.email_akun, ak.nama FROM artist AS a JOIN akun ak ON a.email_akun = ak.email`;
    const artist = result.rows;

    const result2 = await sql`SELECT id, nama FROM Label`;
    const label = result2.rows;

    const result3 = await sql`SELECT s.id, s.email_akun, ak.nama FROM songwriter AS s JOIN akun ak ON s.email_akun = ak.email`;
    const songwriter = result3.rows;

    const result4 = await sql`SELECT DISTINCT genre FROM genre`;
    const genre = result4.rows;

    const user = await checkUser();
    const isArtist = user?.roles.includes("ARTIST");
    const isSongwriter = user?.roles.includes("SONGWRITER");

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="bg-white p-8 rounded-lg shadow-lg text-gray-900 max-w-md w-full">
                <h3 className="text-lg font-semibold text-center mb-4">CREATE ALBUM</h3>
                <form action={handleUserCreateAlbum} className="form-control">
                    <div className="mb-4">
                        <label htmlFor="albumtitle" className="block text-sm font-medium text-gray-700">Judul:</label>
                        <input
                            type="text"
                            id="albumtitle"
                            name="albumtitle"
                            placeholder="Enter your album title here"
                            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="label" className="block text-sm font-medium text-gray-700">Label:</label>
                        <select
                            id="label"
                            name="label"
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                            <option value="" disabled selected>Choose a label</option>
                            {label.map((item) => (
                                <option key={item.id} value={item.id}>{item.nama}</option>
                            ))}
                        </select>
                    </div>
                    <h3 className="text-lg font-semibold text-center mb-4">LAGU PERTAMA</h3>
                    <div className="mb-4">
                        <label htmlFor="songtitle" className="block text-sm font-medium text-gray-700">Judul Lagu:</label>
                        <input
                            type="text"
                            id="songtitle"
                            name="songtitle"
                            placeholder="Enter your song title here"
                            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="artist" className="block text-sm font-medium text-gray-700">Artist:</label>
                        <select
                            id="artist"
                            name="artist"
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                            <option value="" disabled selected>Choose an artist</option>
                            {artist.map((item) => {
                                if (isArtist && user && item.email_akun === user.email) {
                                    return <option key={item.id} value={item.id}>{item.nama}</option>;
                                } else if (isArtist) {
                                    return <option key={item.id} value={item.id} disabled>{item.nama}</option>;
                                } else {
                                    return <option key={item.id} value={item.id}>{item.nama}</option>;
                                }
                            })}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="songwriter" className="block text-sm font-medium text-gray-700">Songwriter :</label>
                        {songwriter.map((s) => (
                            <div key={s.id}>
                                <label>
                                    {s.nama}
                                </label>
                                <input
                                    type="checkbox"
                                    name="songwriter"
                                    value={s.id}
                                    defaultChecked={Boolean(isSongwriter && user && s.email_akun === user.email)}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="genre" className="block text-sm font-medium text-gray-700">Genre:</label>
                        {genre.map(g => (
                            <div>
                                <label>
                                    {g.genre as any}
                                </label>
                                <input type="checkbox" name="genre" value={g.genre} />
                            </div>
                        ))}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Durasi:</label>
                        <input
                            type="text"
                            id="duration"
                            name="duration"
                            placeholder="Enter your song duration here"
                            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        SUBMIT
                    </button>
                </form>
            </div>
        </div>
    );
}
