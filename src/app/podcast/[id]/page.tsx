import Link from "next/link";
import { useRouter } from "next/router";

export default function PlayPodcastPage() {
    const router = useRouter();
    const id: string = router.query.id! as string

    return (
        <div className="flex justify-center">
            <div className="w-1/2 border border-white py-5">
                <h1 className="text-3xl font-bold text-center mb-10">Podcast Detail</h1>
                <div className="px-5">
                    <p>Judul: Podcast 1</p>
                    <p>Genre(s):</p>
                    <ul>
                        <li>- Genre 1</li>
                        <li>- Genre 2</li>
                    </ul>
                    <p>Podcaster: Artist1</p>
                    <p>Song Writer(s):</p>
                    <p>Total Durasi:  8 jam 20 menit</p>
                    <p>Tanggal Rilis: 18/03/24</p>
                    <p>Tahun: 2024</p>
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
                        <tr>
                            <td>SubJudul 1</td>
                            <td>Lorem ipsum, dolor sit amet</td>
                            <td>59 menit</td>
                            <td>18/03/2024</td>
                        </tr>
                        <tr>
                            <td>SubJudul 2</td>
                            <td>Lorem ipsum, dolor sit amet</td>
                            <td>1 jam 8 menit</td>
                            <td>23/02/2020</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    )
}