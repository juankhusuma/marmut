import Link from "next/link";

export default function Play() {
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-center">User Playlist Detail</h1>
            <p>Judul: Playlist1</p>
            <p>Pembuat: Pembuat1</p>
            <p>Jumlah Lagu: 12</p>
            <p>Total Durasi: 8 jam 20 menit</p>
            <p>Tanggal Dibuat: 18/03/24</p>
            <p>Deskripsi: Lorem Ipsum ….</p>
            <Link className="mt-5" href="#">[Shuffle Play]</Link>
            <Link href="#">[Kembali]</Link>
            <h1 className="font-bold my-5 text-center">Daftar Lagu</h1>
            <table className="table w-1/2">
                <thead>
                    <tr>
                        <td>Judul Lagu</td>
                        <td>Oleh</td>
                        <td>Durasi</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Song 1</td>
                        <td>Artist 1</td>
                        <td>3 Menit</td>
                        <td>
                            <Link href="">[Lihat]</Link>
                            <Link href="">[Play]</Link>
                        </td>
                    </tr>
                    <tr>
                        <td>Song 2</td>
                        <td>Artist 2</td>
                        <td>2 Menit</td>
                        <td>
                            <Link href="">[Lihat]</Link>
                            <Link href="">[Play]</Link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}