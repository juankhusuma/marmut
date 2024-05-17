"use server"

import { checkUser } from "@/action/checkUser";
import { handleDeleteEpisode } from "@/action/handleDeleteEpisode";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";

export default async function ViewPodcastEpisodePage({ params }: { params: { id: string } }) {
    const user = await checkUser();
    if (!user) {
        redirect("/auth/login")
    }
    if (!user.roles.includes("PODCASTER")) {
        redirect("/")
    }

    const podcast = (await sql`
    SELECT judul
    FROM konten
    WHERE id = ${params.id}
    `).rows[0]

    const episodes = (await sql`
    SELECT id_episode, judul, deskripsi, durasi, tanggal_rilis
    FROM episode
    WHERE id_konten_podcast = ${params.id}
    `).rows

    const dateFormatter = Intl.DateTimeFormat("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric"
    })

    return (
        <div className="flex flex-col items-center justify-center p-5">
            <div className="w-1/2 flex justify-center flex-col items-center">
                <div className="font-bold mt-5">DAFTAR EPISODE PADA {podcast.judul}</div>
                <table className="table mt-5">
                    <thead>
                        <tr>
                            <td className="text-center">Judul Episode</td>
                            <td className="text-center">Deskripsi</td>
                            <td className="text-center">Durasi</td>
                            <td className="text-center">Tanggal</td>
                            <td className="text-center">Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {episodes.map(episode => (
                            <tr key={episode.id_episode}>
                                <td className="text-center">{episode.judul}</td>
                                <td className="text-center">{episode.deskripsi}</td>
                                <td className="text-center">{episode.durasi}</td>
                                <td className="text-center">{dateFormatter.format(new Date(episode.tanggal_rilis))}</td>
                                <td>
                                    <form action={handleDeleteEpisode}>
                                        <input type="hidden" name="id" value={episode.id_episode} />
                                        <button type="submit">[Hapus]</button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}