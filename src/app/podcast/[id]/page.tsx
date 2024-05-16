import { checkUser } from "@/action/checkUser";
import { sql } from "@vercel/postgres";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function PlayPodcastPage({ params }: { params: { id: string } }) {
    const user = await checkUser();
    if (!user) {
        redirect("/auth/login")
    }
    if (user.roles.includes("LABEL")) {
        redirect("/")
    }

    const dateFormatter = new Intl.DateTimeFormat('id-ID', { dateStyle: 'full' });

    const podcast = (await sql`
    SELECT judul, nama, durasi, tanggal_rilis, tahun
    FROM podcast p
    JOIN konten k ON p.id_konten = k.id
    JOIN akun a ON p.email_podcaster = a.email
    WHERE p.id_konten = ${params.id}
    `).rows[0];

    const genres = (await sql`
    SELECT genre
    FROM genre
    WHERE id_konten = ${params.id}
    `).rows;

    const episodes = (await sql`
    SELECT id_episode, judul, deskripsi, durasi, tanggal_rilis
    FROM episode
    WHERE id_konten_podcast = ${params.id}
    `).rows;

    return (
        <div className="flex justify-center">
            <div className="w-1/2 border border-white py-5">
                <h1 className="text-3xl font-bold text-center mb-10">Podcast Detail</h1>
                <div className="px-5">
                    <p>Judul: {podcast.judul}</p>
                    <p>Genre(s):</p>
                    <ul>
                        {genres.map(g => (
                            <li key={g.genre}> - {g.genre}</li>
                        ))}
                    </ul>
                    <p>Podcaster: {podcast.nama}</p>
                    <p>Total Durasi:  {podcast.durasi}</p>
                    <p>Tanggal Rilis: {dateFormatter.format(podcast.tanggal_rilis)}</p>
                    <p>Tahun: {podcast.tahun}</p>
                </div>
                <div className="flex justify-center">
                    <Link className="my-5 text-center underline w-full" href="/">Kembali</Link>
                </div>
                <div className="border-y border-white">
                    <p className="px-5 py-2 text-center">DAFTAR EPISODE</p>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <td>Judul Episode</td>
                            <td>Deskripsi</td>
                            <td>Durasi</td>
                            <td>Tanggal</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            episodes.map(episode => (
                                <tr key={episode.id_episode}>
                                    <td>{episode.judul}</td>
                                    <td>{episode.deskripsi}</td>
                                    <td>{episode.durasi}</td>
                                    <td>{dateFormatter.format(new Date(episode.tanggal_rilis))}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>

    )
}