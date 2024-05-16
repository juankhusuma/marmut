"use server";

import { checkUser } from "@/action/checkUser";
import Link from "next/link";
import { sql } from "@vercel/postgres";
const dateTimeFormat = new Intl.DateTimeFormat("id-ID", {
  year: "numeric",
  month: "long",
  day: "2-digit",
});

export default async function Home() {
  const user = await checkUser();
  const isLoggedIn = user !== null;
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
async function Dashboard() {
  const user = await checkUser();
  const userInfo = !user!.roles.includes("LABEL") ? (await sql`
  SELECT * FROM akun WHERE email = ${user!.email}
  `).rows[0] : (await sql`
  SELECT * FROM label WHERE email = ${user!.email}
  `).rows[0];

  const roles = user!.roles;
  const isLabel = roles.includes("LABEL");
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body items-center">
        <h1 className="card-title text-center mb-5">Dashboard</h1>
        <div className="card-actions w-full gap-y-3 justify-start flex-col">
          <p>Nama: {userInfo.nama}</p>
          <p>Email: {userInfo.email}</p>
          {isLabel && <p>Kontak: {userInfo.kontak}</p>}
          {!isLabel && <p>Kota Asal: {userInfo.kota_asal}</p>}
          {!isLabel && <p>Gender: {userInfo.gender === 1 ? "Laki-Laki" : "Perempuan"}</p>}
          {!isLabel && <p>Tempat Lahir: {userInfo.tempat_lahir}</p>}
          {!isLabel && <p>Tanggal Lahir: {dateTimeFormat.format(userInfo.tanggal_lahir)}</p>}
          {!isLabel && <p>Role: {roles.join(", ")}</p>}
          {!isLabel && <Playlist />}
          {roles.includes("SONGWRITER") && <Songs />}
          {roles.includes("PODCASTER") && <Podcast />}
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

async function Podcast() {
  const user = await checkUser()!;
  const podcasts = (await sql`
  SELECT * FROM podcast p 
  JOIN konten k ON p.id_konten = k.id
  WHERE email_podcaster = ${user!.email}
  `).rows;
  const isNotNone = podcasts.length > 0;
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
        {
          podcasts.map((podcast: any) => (
            <tr key={podcast.id_konten}>
              <td>{podcast.judul}</td>
              <td><Link href={`/podcast/${podcast.id_konten}`}>[Lihat]</Link></td>
            </tr>
          ))
        }
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