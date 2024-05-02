import Link from "next/link";

export default function ViewPodcastEpisodePage() {
    return (
        <div className="flex flex-col items-center justify-center p-5">
            <div className="w-1/2 flex justify-center flex-col items-center">
                <div className="font-bold mt-5">DAFTAR EPISODE PADA PODCAST 1</div>
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
                        <tr className="text-center">
                            <td>SubJudul 1</td>
                            <td>Lorem ipsum, dolor sit amet</td>
                            <td>59 menit</td>
                            <td>18/03/2024</td>
                            <td>
                                <Link href="#">[Hapus]</Link>
                            </td>
                        </tr>
                        <tr className="text-center">
                            <td>SubJudul 2</td>
                            <td>Lorem ipsum, dolor sit amet</td>
                            <td>1 jam 8 menit</td>
                            <td>23/02/2020</td>
                            <td>
                                <Link href="#">[Hapus]</Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}