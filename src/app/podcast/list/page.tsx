import { checkUser } from "@/action/checkUser";
import { handleDeletePodcast } from "@/action/handleDeletePodcast";
import { sql } from "@vercel/postgres";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function PlayPodcastPage() {
    const user = await checkUser();
    const isLoggedIn = user !== null;

    if (!isLoggedIn) {
        redirect("/auth/login")
    }

    if (!user.roles.includes("PODCASTER")) {
        redirect("/")
    }

    const podcasts = (await sql`
    SELECT p.id_konten AS id, k.judul, COUNT(e.*) AS jumlah_episode, k.durasi AS total_durasi 
    FROM podcast p
    LEFT JOIN konten k ON p.id_konten = k.id
    LEFT JOIN episode e ON k.id = e.id_konten_podcast
    WHERE email_podcaster = ${user.email}
    GROUP BY (p.id_konten, k.judul, k.tanggal_rilis, k.durasi)
    `).rows;

    return (
        <div className="flex justify-center">
            <div className="w-1/2 mt-10 p-10 border border-white">
                <div className="text-center font-bold">LIST PODCAST</div>
                <table className="table mt-5">
                    <thead>
                        <tr>
                            <td className="text-center">Judul</td>
                            <td className="text-center">Jumlah Episode</td>
                            <td className="text-center">Total Durasi</td>
                            <td className="text-center">Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {podcasts.map(podcast => (
                            <tr key={podcast.id}>
                                <td className="text-center">{podcast.judul}</td>
                                <td className="text-center">{podcast.jumlah_episode}</td>
                                <td className="text-center">{podcast.total_durasi}</td>
                                <td>
                                    <ul>
                                        <li className="text-center"><Link href={`/podcast/${podcast.id}/episodes`}>[Lihat Daftar Episode]</Link></li>
                                        <li className="text-center"><Link href={`/podcast/${podcast.id}/episodes/create`}>[Tambah Episode]</Link></li>
                                        <li className="text-center">
                                            <form action={handleDeletePodcast}>
                                                <input type="hidden" name="id" value={podcast.id} />
                                                <button type="submit">[Hapus]</button>
                                            </form>
                                        </li>
                                    </ul>
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    )
}