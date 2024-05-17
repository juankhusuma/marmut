"use server"

import { uuid } from "@/utils/uuid";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";

export async function handleRegisterLabel(formData: FormData) {
    const { rowCount } = await sql`
    SELECT 1 FROM LABEL WHERE email = ${formData.get("email")! as string}`;
    if (rowCount == 1) {
        console.log("Email sudah terdaftar")
        redirect("/auth/register/label")
    }

    const { rows } = await sql`
    INSERT INTO PEMILIK_HAK_CIPTA(id, rate_royalti)
    VALUES (${uuid()}, 0)
    RETURNING id
    `
    const pemilikHakCiptaId = rows[0].id as string;

    try {
        await sql`
        INSERT INTO LABEL(id, nama, email, password, kontak, id_pemilik_hak_cipta) 
        VALUES (
            ${uuid()},
            ${formData.get("nama")! as string},
            ${formData.get("email")! as string},
            ${formData.get("password")! as string},
            ${formData.get("kontak")! as string},
            ${pemilikHakCiptaId}
        )`;
    } catch (error) {
        console.log(error)
        await sql`DELETE FROM PEMILIK_HAK_CIPTA WHERE id = ${pemilikHakCiptaId}`;
        redirect("/auth/register/label")
    }

    redirect("/auth/login")

}