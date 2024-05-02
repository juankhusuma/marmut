import { Inter } from "next/font/google";
import { GetServerSideProps } from "next";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const isLoggedIn = true;
  return (
    <div className="flex justify-center items-center">
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
  const roles = ["Pengguna Biasa"];
  const isLabel = roles.includes("Label");
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
          {!isLabel && <Playlist />}
          {roles.includes("Songwriter") && <Songs />}
          {roles.includes("Podcaster") && <Podcast />}
          {isLabel && <Album />}
        </div>
      </div>
    </div>
  )
}

function Playlist() {
  const isNotNone = false;
  return (
    isNotNone ? (<div className="flex w-full flex-col items-center">
      <h1>Playlist Pengguna</h1>
      <table className="table">
        <thead>
          <tr>
            <td>Nama</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Playlist 1</td>
            <td><Link href="#">[Lihat]</Link></td>
          </tr>
          <tr>
            <td>Playlist 2</td>
            <td><Link href="#">[Lihat]</Link></td>
          </tr>
          <tr>
            <td>Playlist 2</td>
            <td><Link href="#">[Lihat]</Link></td>
          </tr>
        </tbody>
      </table>
    </div>) : (
      <p>Playlist: "Belum Memiliki Playlist".</p>
    )
  )
}

function Songs() {
  const isNotNone = false;
  return (isNotNone ? (<div className="flex w-full flex-col items-center">
    <h1>Lagu Pengguna</h1>
    <table className="table">
      <thead>
        <tr>
          <td>Judul</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Lagu 1</td>
          <td><Link href="#">[Lihat]</Link></td>
        </tr>
        <tr>
          <td>Lagu 2</td>
          <td><Link href="#">[Lihat]</Link></td>
        </tr>
        <tr>
          <td>Lagu 2</td>
          <td><Link href="#">[Lihat]</Link></td>
        </tr>
      </tbody>
    </table>
  </div>) : (
    <p>Lagu: "Belum Memiliki Lagu".</p>
  ))
}

function Podcast() {
  const isNotNone = true;
  return (isNotNone ? (<div className="flex w-full flex-col items-center">
    <h1>Podcast Pengguna</h1>
    <table className="table">
      <thead>
        <tr>
          <td>Judul</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Podcast 1</td>
          <td><Link href="#">[Lihat]</Link></td>
        </tr>
        <tr>
          <td>Podcast 2</td>
          <td><Link href="#">[Lihat]</Link></td>
        </tr>
        <tr>
          <td>Podcast 2</td>
          <td><Link href="#">[Lihat]</Link></td>
        </tr>
      </tbody>
    </table>
  </div>) : (
    <p>Podcast: "Belum Memiliki Podcast".</p>
  ))
}

function Album() {
  const isNotNone = false;
  return (isNotNone ? (<div className="flex w-full flex-col items-center">
    <h1>Album</h1>
    <table className="table">
      <thead>
        <tr>
          <td>Judul</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Album 1</td>
          <td><Link href="#">[Lihat]</Link></td>
        </tr>
        <tr>
          <td>Album 2</td>
          <td><Link href="#">[Lihat]</Link></td>
        </tr>
        <tr>
          <td>Album 2</td>
          <td><Link href="#">[Lihat]</Link></td>
        </tr>
      </tbody>
    </table>
  </div>) : (
    <p>Album: "Belum Memproduksi Album".</p>
  ))
}