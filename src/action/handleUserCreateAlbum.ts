"use server";
import { sql } from "@vercel/postgres";

export async function handleUserCreateAlbum(formData: FormData) {
    const albumtitle = formData.get("albumtitle")! as string;
    const label = formData.get("label")! as string;
    const songtitle = formData.get("songtitle")! as string;
    const artist = formData.get("artist")! as string;
    const genre = formData.get("genre")! as string;
    const duration = formData.get("duration")! as string;

    await sql`
            INSERT INTO ALBUM(id, judul, jumlah_lagu, id_label, total_durasi)
            VALUES (a123456, ${albumtitle}, 0, ${label},0);

            INSERT INTO konten (id, judul, tanggal_rilis, tahun, durasi)
            VALUES (k123456, ${songtitle} , CURRENT_DATE, EXTRACT(YEAR FROM CURRENT_DATE),${duration});

            INSERT INTO song(id_konten, id_artist, id_album, total_play, total_download)
            VALUES (k123456, ar123456, a123456, 0, 0);

            INSERT INTO song(id_konten, id_artist, id_album, total_play, total_download)
            VALUES (k123456, ar123456, a123456, 0, 0);  
        `;
}

// uuid_generate_v4()