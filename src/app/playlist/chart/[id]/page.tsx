import Link from "next/link";

export default function ViewChartDetailsPage() {
    return (
        <div className="flex flex-col items-center justify-center p-5">
            <div className="w-1/2 flex justify-center flex-col items-center">
                <div className="font-bold mt-5">CHART DETAIL</div>
                <div className="w-full text-left my-5">Tipe: Daily Top 20</div>
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
                        <tr className="text-center">
                            <td>Song 1</td>
                            <td>Artist 1</td>
                            <td>09/03/2024</td>
                            <td>21000</td>
                            <td><Link href="#">[Lihat]</Link></td>
                        </tr>
                        <tr className="text-center">
                            <td>Song 2</td>
                            <td>Artist 2</td>
                            <td>02/03/2024</td>
                            <td>19000</td>
                            <td><Link href="#">[Lihat]</Link></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}