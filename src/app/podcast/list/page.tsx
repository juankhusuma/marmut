import Link from "next/link";

export default function PlayPodcastPage() {
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
                        <tr>
                            <td className="text-center">Podcast 1</td>
                            <td className="text-center">0</td>
                            <td className="text-center">0</td>
                            <td>
                                <ul>
                                    <li className="text-center"><Link href="list/1/episodes">[Lihat Daftar Episode]</Link></li>
                                    <li className="text-center"><Link href="list/1/episodes/create">[Tambah Episode]</Link></li>
                                    <li className="text-center"><Link href="/">[Hapus]</Link></li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td className="text-center">Podcast 2</td>
                            <td className="text-center">2</td>
                            <td className="text-center">4 menit</td>
                            <td>
                                <ul>
                                    <li className="text-center"><Link href="list/2/episodes">[Lihat Daftar Episode]</Link></li>
                                    <li className="text-center"><Link href="list/2/episodes/create">[Tambah Episode]</Link></li>
                                    <li className="text-center"><Link href="/">[Hapus]</Link></li>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    )
}