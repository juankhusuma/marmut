"use server";

import { sql } from "@vercel/postgres";

export async function handleUserPL() {
    const data = {'Judul':'myFsong', 'Jumlah Lagu':10, 'Total Durasi': '10 Minutes', 'Action':'-'}
    return data;
}