import { checkUser } from "@/action/checkUser";
import { sql } from "@vercel/postgres";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ViewChartPage() {
    const user = await checkUser();

    if (!user) {
        redirect("/auth/login")
    }

    if (user.roles.includes("LABEL")) {
        redirect("/")
    }

    const chart = (await sql`
    SELECT * FROM chart
    `).rows;

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
                        {
                            chart.map((c) => (
                                <tr key={c.type} className="text-center">
                                    <td>{c.type}</td>
                                    <td>
                                        <Link href={`chart/${c.type}`}>[Lihat Daftar Lagu]</Link>
                                    </td>
                                </tr>
                            ))

                        }
                    </tbody>
                </table>
                <Link href="/" className="font-bold mt-5 underline">[Kembali]</Link>
            </div>
        </div>
    )
}