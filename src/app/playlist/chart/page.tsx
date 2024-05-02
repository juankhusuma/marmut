import Link from "next/link";

export default function ViewChartPage() {
    return (
        <div className="flex flex-col items-center justify-center p-5">
            <div className="w-1/2 flex justify-center flex-col items-center">
                <div className="font-bold mt-5">CHART LIST</div>
                <table className="table">
                    <thead>
                        <tr>
                            <td className="text-center">Tipe</td>
                            <td className="text-center">Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="text-center">
                            <td>Daily Top 20</td>
                            <td>
                                <Link href="chart/1">[Lihat Daftar Lagu]</Link>
                            </td>
                        </tr>
                        <tr className="text-center">
                            <td>Weekly Top 20</td>
                            <td>
                                <Link href="chart/2">[Lihat Daftar Lagu]</Link>
                            </td>
                        </tr>
                        <tr className="text-center">
                            <td>Monthly Top 20</td>
                            <td>
                                <Link href="chart/3">[Lihat Daftar Lagu]</Link>
                            </td>
                        </tr>
                        <tr className="text-center">
                            <td>Yearly Top 20</td>
                            <td>
                                <Link href="chart/4">[Lihat Daftar Lagu]</Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Link href="/" className="font-bold mt-5 underline">[Kembali]</Link>
            </div>
        </div>
    )
}