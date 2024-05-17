"use server";
import { checkUser } from "@/action/checkUser";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";

export default async function RoyaltyPage() {
  const user = await checkUser();
  const isArtist = user?.roles.includes("ARTIST");
  const isSongwriter = user?.roles.includes("SONGWRITER");
  const isLabel = user?.roles.includes("LABEL");

  console.log(user);

  let result;
  
  if (isArtist){
    result = await sql`SELECT
    k.judul AS judul_lagu,
    a.judul AS judul_album,
    s.total_play,
    s.total_download,
    (CAST(s.total_play AS BIGINT) * CAST(phc.rate_royalti AS BIGINT)) AS Total_Royalti_Didapat
    FROM
    song s
    JOIN artist ar ON s.id_artist = ar.id
    JOIN konten k ON s.id_konten = k.id
    JOIN album a ON s.id_album = a.id
    LEFT JOIN pemilik_hak_cipta phc ON ar.id_pemilik_hak_cipta = phc.id
    WHERE ar.email_akun = ${user?.email}
    `;
  }

  else if (isSongwriter){
    result = await sql`SELECT
    k.judul AS judul_lagu,
    a.judul AS judul_album,
    s.total_play,
    s.total_download,
    (CAST(s.total_play AS BIGINT) * CAST(phc.rate_royalti AS BIGINT)) AS Total_Royalti_Didapat
    FROM
    song s
    JOIN konten k ON s.id_konten = k.id
    JOIN album a ON s.id_album = a.id
    JOIN songwriter so ON s.id_artist = so.id
    LEFT JOIN pemilik_hak_cipta phc ON so.id_pemilik_hak_cipta = phc.id
    WHERE so.email_akun = ${user?.email}
    `;
  }

  else if (isLabel){
    result = await sql`SELECT
    k.judul AS judul_lagu,
    a.judul AS judul_album,
    s.total_play,
    s.total_download,
    (CAST(s.total_play AS BIGINT) * CAST(phc.rate_royalti AS BIGINT)) AS Total_Royalti_Didapat
    FROM
    song s
    JOIN konten k ON s.id_konten = k.id
    JOIN album a ON s.id_album = a.id
    JOIN label so ON s.id_artist = la.id
    LEFT JOIN pemilik_hak_cipta phc ON la.id_pemilik_hak_cipta = phc.id;
    WHERE la.email = ${user?.email}
    `;
  }

  if (!result) {
    return (
      <div className="p-10 flex justify-center">
        <div>User does not have the required role to view this page.</div>
      </div>
    );
  }

  const tampilan = result.rows;

  const f = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });



  return (
    <div className="p-10 flex justify-center">
      <div>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th>Judul Lagu</th>
              <th>Judul Album</th>
              <th>Total Play</th>
              <th>Total Download</th>
              <th>Total Royalti Didapat</th>
            </tr>
          </thead>
          <tbody>
            {tampilan.map((row, index) => (
              <tr key={index}>
                <td>{row.judul_lagu}</td>
                <td>{row.judul_album}</td>
                <td className="text-center">{row.total_play}</td>
                <td className="text-center">{row.total_download}</td>
                <td>{f.format(row.Total_Royalti_Didapat)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
