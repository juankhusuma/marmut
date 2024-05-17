import { checkUser } from "@/action/checkUser";
import { sql } from "@vercel/postgres";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ViewChartDetailsPage({ params }: { params: { id: string } }) {
    const user = await checkUser();

    if (!user) {
        redirect("/auth/login")
    }

    if (user.roles.includes("LABEL")) {
        redirect("/")
    }

    const songs = (await sql`
    SELECT s.id_konten as id, judul, ak.nama as artist, tanggal_rilis, total_play
    FROM song s
    JOIN konten k ON s.id_konten = k.id
    JOIN artist a ON s.id_artist = a.id
    JOIN akun ak ON a.email_akun = ak.email
    WHERE NOT total_play = 0
    ORDER BY total_play DESC
    LIMIT 20
    `).rows;

    const dateFormatter = new Intl.DateTimeFormat('id-ID', { dateStyle: 'full' });

    return (
        <div className="flex flex-col items-center justify-center p-5">
            <div className="w-1/2 flex justify-center flex-col items-center">
                <div className="font-bold mt-5">CHART DETAIL</div>
                <div className="w-full text-left my-5">Tipe: {decodeURIComponent(params.id)}</div>
                <Link href="/" className="font-bold mt-5 underline">[Kembali]</Link>
                <div className="font-bold mt-20">DAFTAR LAGU</div>
                <table className="table">
                    <thead>
                        <tr>
                            <td className="text-center">Judul Lagu</td>
                            <td className="text-center">Oleh</td>
                            <td className="text-center">Tanggal Rilis</td>
                            <td className="text-center">Total Plays</td>
                            <td className="text-center">Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            songs.map((s) => (
                                <tr key={s.id} className="text-center">
                                    <td>{s.judul}</td>
                                    <td>{s.artist}</td>
                                    <td>{dateFormatter.format(s.tanggal_rilis)}</td>
                                    <td>{s.total_play}</td>
                                    <td><Link href="#">[Lihat]</Link></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}