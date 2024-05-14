"use server";

import { handleUserCreateAlbum } from "@/action/handleUserCreateAlbum";
import { sql } from "@vercel/postgres";
import { FormEvent } from "react";

export default async function UserCreateAlbumPage() {
    const result = await sql`SELECT email_akun, nama from artist as a join akun ak on a.email_akun = ak.email`
    const artist = result.rows
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="bg-white p-8 rounded-lg shadow-lg text-gray-900 max-w-md w-full">
                <h3 className="text-lg font-semibold text-center mb-4">CREATE ALBUM</h3>
                <form action ={handleUserCreateAlbum} className="form-control">
                    <div className="mb-4">
                        <label htmlFor="albumtitle" className="block text-sm font-medium text-gray-700">Judul:</label>
                        <input
                            type="text"
                            id="albumtitle"
                            name="albumtitle"
                            placeholder="Enter your album title here"
                            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="label" className="block text-sm font-medium text-gray-700">Label:</label>
                        <select
                            id="label"
                            name="label"
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                            <option value="" disabled selected>Choose a label</option>
                            <option value="label1">Label 1</option>
                            <option value="label2">Label 2</option>
                            <option value="label3">Label 3</option>
                        </select>
                    </div>
                    <h3 className="text-lg font-semibold text-center mb-4">LAGU PERTAMA</h3>
                    <div className="mb-4">
                        <label htmlFor="songtitle" className="block text-sm font-medium text-gray-700">Judul Lagu:</label>
                        <input
                            type="text"
                            id="songtitle"
                            name="songtitle"
                            placeholder="Enter your song title here"
                            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="artist" className="block text-sm font-medium text-gray-700">Artist:</label>
                        <select
                            id="artist"
                            name="artist"
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                            <option value="" disabled selected>Choose a artist</option>
                            {artist.map((item) => (
                                <option value={item.email_akun}>{item.nama}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="genre" className="block text-sm font-medium text-gray-700">Genre:</label>
                        <select
                            id="genre"
                            name="genre"
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                            <option value="" disabled selected>Choose genre</option>
                            <option value="genre1">Romance</option>
                            <option value="genre2">Jazz</option>
                            <option value="genre3">Pop</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Durasi:</label>
                        <input
                            type="text"
                            id="duration"
                            name="duration"
                            placeholder="Enter your song duration here"
                            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        SUBMIT
                    </button>
                </form>
            </div>
        </div>
    );
}
