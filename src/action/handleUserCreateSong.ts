"use server";
import { sql } from "@vercel/postgres";
import { uuid } from "@/utils/uuid";

export async function handleUserCreateSong(formData: FormData) {
    const songtitle = formData.get("songtitle")! as string;
    const albumId = formData.get("album")! as string;
    const artistId = formData.get("artist")! as string;
    const genre = formData.getAll("genre")! as string[];
    const songwriterId = formData.getAll("songwriter")! as string[];
    const duration = formData.get("duration")! as string;

    console.log(albumId);
    console.log(formData);

    console.log(genre);

    const contentId = uuid();

    await sql`
        INSERT INTO KONTEN (id, judul, tanggal_rilis, tahun, durasi)
        VALUES (${contentId}, ${songtitle}, CURRENT_DATE, EXTRACT(YEAR FROM CURRENT_DATE), ${duration});
    `;

    await sql`
        INSERT INTO SONG(id_konten, id_artist, id_album, total_play, total_download)
        VALUES (${contentId}, ${artistId}, ${albumId}, 0, 0);
    `;

    await sql`
    UPDATE ALBUM
    SET jumlah_lagu = jumlah_lagu + 1
    WHERE id = ${albumId};
`;

 for (const g of genre){
     await sql`
         INSERT INTO GENRE (id_konten, genre)
         VALUES (${contentId}, ${g});
     `;
 }

 for (const s of songwriterId){
     await sql`INSERT INTO SONGWRITER_WRITE_SONG (id_songwriter, id_song)
     VALUES (${s}, ${contentId})
     `;
 }

    
}