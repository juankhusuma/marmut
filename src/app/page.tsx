import { Inter } from "next/font/google";
import { GetServerSideProps } from "next";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const isLoggedIn = false;
  return (
    <div className="flex justify-center items-center h-screen">
      {isLoggedIn ? <Dashboard /> : <UnauthorizedHome />}
    </div>
  );
}

function UnauthorizedHome() {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body items-center">
        <h1 className="card-title text-center mb-5">Marmut - E17</h1>
        <div className="card-actions w-1/2 gap-y-3 justify-center items-center flex-col">
          <Link href="/auth/login" className="btn text-white font-bold w-full btn-primary">Login</Link>
          <Link href="/auth/register" className="btn text-white font-bold w-full btn-primary">Register</Link>
        </div>
      </div>
    </div>
  )
}
function Dashboard() {
  const isLabel = false;
  const roles = ["Artist", "Podcaster"];
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body items-center">
        <h1 className="card-title text-center mb-5">Dashboard</h1>
        <div className="card-actions w-full gap-y-3 justify-start flex-col">
          <p>Nama: Pengguna 1</p>
          <p>Email: pengguna1@email.com</p>
          {isLabel && <p>Kontak: 085233445544</p>}
          {!isLabel && <p>Kota Asal: Depok</p>}
          {!isLabel && <p>Gender: Laki-Laki</p>}
          {!isLabel && <p>Tempat Lahir: Pekanbaru</p>}
          {!isLabel && <p>Tanggal Lahir: 6 September 2002</p>}
          {!isLabel && <p>Role: {roles.join(", ")}</p>}
          {

          }
        </div>
      </div>
    </div>
  )
}
