"use server";
import { sql } from "@vercel/postgres";
import { uuid } from "@/utils/uuid";

export async function handleUserCreateSong(formData: FormData) {
    const songtitle = formData.get("songtitle")! as string;
    const albumId = formData.get("album")! as string;
    const artistId = formData.get("artist")! as string;
    const genre = formData.get("genre")! as string;
    const songwriterId = formData.get("songwriter")! as string;
    const duration = formData.get("duration")! as string;

    const contentId = uuid();

    await sql`
        INSERT INTO KONTEN (id, judul, tanggal_rilis, tahun, durasi)
        VALUES (${contentId}, ${songtitle}, CURRENT_DATE, EXTRACT(YEAR FROM CURRENT_DATE), ${duration});
    `;

    await sql`
        INSERT INTO SONG(id_konten, id_artist, id_album, total_play, total_download)
        VALUES (${contentId}, ${artistId}, '6496aa56-9f5d-4bda-ae71-b9a8e2f14b84', 0, 0);
    `;

    await sql`
    UPDATE ALBUM
    SET jumlah_lagu = jumlah_lagu + 1
    WHERE id = ${albumId};
`;

    await sql`
        INSERT INTO GENRE (id_konten, genre)
        VALUES (${contentId}, ${genre});
    `;

    await sql`INSERT INTO SONGWRITER_WRITE_SONG (id_songwriter, id_song)
    VALUES (${songwriterId}, ${contentId})
    `;
    
}