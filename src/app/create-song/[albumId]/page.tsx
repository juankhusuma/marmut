"use server";

import { handleUserCreateSong } from "@/action/handleUserCreateSong";
import { sql } from "@vercel/postgres";
import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default async function CreateSong({ params }: { params: {albumId: string}}) {

    params.albumId = decodeURIComponent(params.albumId);

    const result = await sql`SELECT a.id, a.email_akun, ak.nama FROM artist AS a JOIN akun ak ON a.email_akun = ak.email`;
    const artist = result.rows;

    const result3 = await sql `SELECT judul from album where album.id = ${params.albumId}`
    const p = result3.rows[0]?.judul;

    console.log(p);
    
    const result2 = await sql`SELECT s.id, s.email_akun, ak.nama FROM songwriter AS s JOIN akun ak ON s.email_akun = ak.email`;
    const songwriter = result2.rows;

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="bg-white p-6 rounded-lg shadow-lg text-gray-900 max-w-md w-full">
                <h3 className="text-lg font-semibold text-center mb-4">CREATE LAGU</h3>
                <form action = {handleUserCreateSong} className = "form-control">
                    <div className="mb-4">
                        <label htmlFor="album" className="block text-sm font-medium text-gray-700">Album:</label>
                        <input type="text" value={p} id="album" name="album" placeholder="Input the album..." className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" disabled />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="songtitle" className="block text-sm font-medium text-gray-700">Judul:</label>
                        <input type="text" id="songtitle" name="songtitle" placeholder="Input the song title..." className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="artist" className="block text-sm font-medium text-gray-700">Artist:</label>
                        <select id="artist" name="artist" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                            <option value="" disabled selected>Choose a artist</option>
                            {artist.map((item) => (
                                <option key = {item.id} value={item.id}>{item.nama}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="songwriter" className="block text-sm font-medium text-gray-700">Songwriter :</label>
                        <select id="songwriter" name="songwriter" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                            <option value="" disabled selected>Choose songwriter</option>
                            {songwriter.map((item) => (
                                <option key = {item.id} value={item.id}>{item.nama}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="genre" className="block text-sm font-medium text-gray-700">Genre:</label>
                        <select id="genre" name="genre" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                            <option value="" disabled selected>Choose genre</option>
                            <option value="genre">red Soul</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Durasi:</label>
                        <input type="text" id="duration" name="duration" placeholder="Input the song duration..." className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        SUBMIT
                    </button>
                </form>
            </div>
        </div>
    );
}
