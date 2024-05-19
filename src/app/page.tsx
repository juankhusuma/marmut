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

async function Playlist() {
  const user = await checkUser();
  const playlist = (await sql`
  SELECT * FROM USER_PLAYLIST
  WHERE email_pembuat = ${user!.email}
  `).rows;
  const isNotNone = playlist.length > 0;
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
          {playlist.map((playlist: any) => (
            <tr>
              <td>{playlist.judul}</td>
              <td><Link href={`/playlist/playup?id_playlist=${playlist.id_playlist}&id_user_playlist=${playlist.id_user_playlist}`}>[Lihat]</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>) : (
      <p>Playlist: "Belum Memiliki Playlist".</p>
    )
  )
}

async function Songs() {
  const user = await checkUser();
  const isArtist = user?.roles.includes("ARTIST");
  let isNotNone = false;
  let songs: any = [];
  if (isArtist) {
    const result1 = await sql`
      SELECT
        k.judul AS judul_lagu
      FROM
      song s
      join konten k on s.id_konten = k.id
      JOIN artist ar ON s.id_artist = ar.id
      WHERE ar.email_akun = ${user!.email}`;

    songs = result1.rows;
    isNotNone = songs.length > 0;
  }
  else {
    const result1 = await sql`
    SELECT
      k.judul AS judul_lagu, k.id
    FROM
      song s
    join konten k on s.id_konten = k.id
    join songwriter_write_song sws on sws.id_song = s.id_konten
    join songwriter so on so.id = sws.id_songwriter
    WHERE so.email_akun = ${user!.email}`;

    songs = result1.rows;
    isNotNone = songs.length > 0;
  }

  return (
    isNotNone ? (
      <div className="flex w-full flex-col items-center">
        <h1>Lagu Pengguna</h1>
        <table className="table">
          <thead>
            <tr>
              <td>Judul</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {songs.map((song: any, index: any) => (
              <tr key={index}>
                <td>{song.judul_lagu}</td>
                <td><Link href={`/playlist/playsong?id_konten=${song.id}`}>[Lihat]</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <p>Lagu: "Belum Memiliki Lagu".</p>
    )
  );
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

async function Album() {
  const user = await checkUser();
  const result = await sql`
    SELECT a.judul, a.id
    FROM album a
    JOIN label la ON a.id_label = la.id
    WHERE la.email = ${user?.email}
  `;

  const albums = result.rows;
  const isNotNone = albums.length > 0; //penanda ada isinya

  return (
    <div className="flex w-full flex-col items-center">
      <h1>Album</h1>
      {isNotNone ? (
        <table className="table">
          <thead>
            <tr>
              <td>Judul</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {albums.map((album, index) => (
              <tr key={index}>
                <td>{album.judul}</td>
                <td>
                  <Link href={`/album-song/label/${album.id}`}>[Lihat]</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Album: "Belum Memproduksi Album".</p>
      )}
    </div>
  );
}