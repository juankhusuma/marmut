"use server";
import { uuid } from "@/utils/uuid";
import { sql } from "@vercel/postgres";

export async function handleUserRegister(formData: FormData) {
    const email = formData.get("email")! as string;
    const password = formData.get("password")! as string;
    const nama = formData.get("nama")! as string;
    const gender = formData.get("gender")! as string;
    const tempat_lahir = formData.get("tempat_lahir")! as string;
    const tanggal_lahir = formData.get("tanggal_lahir")! as string;
    const kota_asal = formData.get("kota_asal")! as string;
    const roles = formData.getAll("role")! as string[];

    const id = uuid()

    await sql`
            INSERT INTO AKUN (email, password, nama, gender, tempat_lahir, tanggal_lahir, is_verified, kota_asal)
            VALUES (${email}, ${password}, ${nama}, ${gender}, ${tempat_lahir}, ${tanggal_lahir}, false, ${kota_asal})
        `;

    for (const role of roles) {
        if (role === "podcaster") {
            await sql`
                INSERT INTO PODCASTER (email)
                VALUES (${email})
            `;
        }
        if (role === "artist") {
            await sql`
                INSERT INTO ARTIST (email)
                VALUES (${email})
            `;
        }
        if (role === "songwriter") {
            await sql`
                INSERT INTO PEMILIK_HAK_CIPTA (id, rate_royalti)
                VALUES (${id}, 0)
            `;
            await sql`
                INSERT INTO SONGWRITER (id, email_akun, id_pemilik_hak_cipta)
                VALUES (${uuid()}, ${email}, ${id})
            `;
        }
    }


}