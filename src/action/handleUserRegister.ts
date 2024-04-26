"use server";
import { sql } from "@vercel/postgres";

export async function handleUserRegister(formData: FormData) {
    const email = formData.get("email")! as string;
    const password = formData.get("password")! as string;
    const nama = formData.get("nama")! as string;
    const gender = formData.get("gender")! as string;
    const tempat_lahir = formData.get("tempat_lahir")! as string;
    const tanggal_lahir = formData.get("tanggal_lahir")! as string;
    const kota_asal = formData.get("kota_asal")! as string;

    await sql`
            INSERT INTO AKUN (email, password, nama, gender, tempat_lahir, tanggal_lahir, is_verified, kota_asal)
            VALUES (${email}, ${password}, ${nama}, ${gender}, ${tempat_lahir}, ${tanggal_lahir}, false, ${kota_asal})
        `;
}