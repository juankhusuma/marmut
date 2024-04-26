import { Inter } from "next/font/google";
import { GetServerSideProps } from "next";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body items-center">
          <h1 className="card-title text-center mb-5">Marmut - E17</h1>
          <div className="card-actions w-1/2 gap-y-3 justify-center items-center flex-col">
            <Link href="/auth/login" className="btn text-white font-bold w-full btn-primary">Login</Link>
            <Link href="/auth/register" className="btn text-white font-bold w-full btn-primary">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// export const getServerSideProps: GetServerSideProps = async () => {
//   interface Akun {
//     email: string,
//     password: string,
//     nama: string,
//     gender: number,
//     tempat_lahir: string,
//     tanggal_lahir: Date,
//     is_verified: boolean,
//     kota_asal: string,
//   }

//   const { rowCount, rows } = await sql`SELECT * FROM AKUN`;

//   console.log(rowCount);
//   console.log(rows);

//   return {
//     props: {}
//   }
// }