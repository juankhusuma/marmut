import React from 'react';

export default function CreateSong() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="bg-white p-6 rounded-lg shadow-lg text-gray-900 max-w-md w-full">
                <h3 className="text-lg font-semibold text-center mb-4">CREATE LAGU</h3>
                <form>
                    <div className="mb-4">
                        <label htmlFor="album" className="block text-sm font-medium text-gray-700">Album:</label>
                        <input type="text" id="album" name="album" placeholder="Input the album..." className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" disabled />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="judul" className="block text-sm font-medium text-gray-700">Judul:</label>
                        <input type="text" id="judul" name="judul" placeholder="Input the song title..." className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="artist" className="block text-sm font-medium text-gray-700">Artist:</label>
                        <select id="artist" name="artist" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                            <option>Choose an artist</option>
                            <option value="artist1">Artist 1</option>
                            <option value="artist2">Artist 2</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="genre" className="block text-sm font-medium text-gray-700">Songwriter :</label>
                        <select id="genre" name="genre" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                            <option>Choose songwriter</option>
                            <option value="artist1">Songwriter 1</option>
                            <option value="artist2">Songwriter 2</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="genre" className="block text-sm font-medium text-gray-700">Genre:</label>
                        <select id="genre" name="genre" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                            <option>Choose genre</option>
                            <option value="artist1">Genre 1</option>
                            <option value="artist2">Genre 2</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="durasi" className="block text-sm font-medium text-gray-700">Durasi:</label>
                        <input type="text" id="durasi" name="durasi" placeholder="Input the song duration..." className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        SUBMIT
                    </button>
                </form>
            </div>
        </div>
    );
    
}
