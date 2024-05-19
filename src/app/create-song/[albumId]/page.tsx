"use server";

import { handleUserCreateSong } from "@/action/handleUserCreateSong";
import { sql } from "@vercel/postgres";
import { checkUser } from "@/action/checkUser";

export default async function CreateSong({ params }: { params: { albumId: string } }) {

    params.albumId = decodeURIComponent(params.albumId);

    const result = await sql`SELECT a.id, a.email_akun, ak.nama FROM artist AS a JOIN akun ak ON a.email_akun = ak.email`;
    const artist = result.rows;

    const result3 = await sql`SELECT judul from album where album.id = ${params.albumId}`
    const p = result3.rows[0]?.judul;

    console.log(p);

    const result2 = await sql`SELECT s.id, s.email_akun, ak.nama FROM songwriter AS s JOIN akun ak ON s.email_akun = ak.email`;
    const songwriter = result2.rows;

    const result4 = await sql`SELECT distinct genre from genre`;
    const genre = result4.rows;

    const user = await checkUser();
    const isArtist = user?.roles.includes("ARTIST");
    const isSongwriter = user?.roles.includes("SONGWRITER");

    console.log(songwriter);
    console.log(isArtist);
    console.log(isSongwriter);
    console.log(user);


    return (
        <div className="flex justify-center">
            <div className="p-6 rounded-lg shadow-lg max-w-md w-full">
                <h3 className="text-lg font-semibold text-center mb-4">CREATE LAGU</h3>
                <form action={handleUserCreateSong} className="form-control">
                    <div className="mb-4">
                        <label htmlFor="album" className="block text-sm font-medium text-gray-700">Album:</label>
                        <p>{p}</p>
                        <input type="hidden" value={params.albumId} id="album" name="album" className="input input-sm input-primary" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="songtitle" className="block text-sm font-medium text-gray-700">Judul:</label>
                        <input type="text" id="songtitle" name="songtitle" placeholder="Input the song title..." className="input input-sm input-primary" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="artist" className="block text-sm font-medium text-gray-700">Artist:</label>
                        <select
                            id="artist"
                            name="artist"
                            className="select select-sm select-primary">
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
                        <div className="h-[200px] overflow-y-auto">
                            {songwriter.map((s) => (
                                <label key={s.id} className="flex my-2 items-center">
                                    <input
                                        className="checkbox"
                                        type="checkbox"
                                        name="songwriter"
                                        value={s.id}
                                        defaultChecked={!!isSongwriter && !!user && (s.email_akun === user.email)}
                                    />
                                    <span className="ml-2">{s.nama}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="genre" className="block text-sm font-medium text-gray-700">Genre:</label>
                        <div className="h-[200px] overflow-y-auto">
                            {genre.map(g => (
                                <label key={g.genre} className="flex my-2 items-center">
                                    <input className="checkbox" type="checkbox" name="genre" value={g.genre} />
                                    <span className="ml-2">{g.genre as any}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Durasi:</label>
                        <input type="text" id="duration" name="duration" placeholder="Input the song duration..." className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        SUBMIT
                    </button>
                </form>
            </div>
        </div>
    );
}
