import React from 'react';
import { useRouter } from 'next/router';

export default function DeletionSuccess() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <div className="bg-white p-6 rounded-lg shadow-lg text-gray-900 max-w-md w-full text-center">
                <p className="text-lg mb-4">Berhasil menghapus Lagu dengan judul 'Song1' dari daftar unduhan!</p>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Kembali
                </button>
            </div>
        </div>
    );
}
