import Link from 'next/link';
import React from 'react';

export default function PaketLangganan() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="bg-white p-6 rounded-lg shadow-lg text-gray-900 max-w-4xl w-full">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">LANGGANAN PAKET</h3>
                    <Link href = "/paket-langganan/riwayat-transaksi">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Riwayat Transaksi
                    </button>
                    </Link>
                </div>
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Jenis
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Harga
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">1 Bulan</td>
                            <td className="px-6 py-4 whitespace-nowrap">Rp54.900</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <Link href = "/paket-langganan/pembayaran-paket">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Berlangganan</button>
                                </Link>     
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">3 Bulan</td>
                            <td className="px-6 py-4 whitespace-nowrap">...</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <Link href = "/paket-langganan/pembayaran-paket">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Berlangganan</button>
                                </Link>  
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">6 Bulan</td>
                            <td className="px-6 py-4 whitespace-nowrap">...</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <Link href = "/paket-langganan/pembayaran-paket">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Berlangganan</button>
                                </Link>  
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">1 Tahun</td>
                            <td className="px-6 py-4 whitespace-nowrap">...</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <Link href = "/paket-langganan/pembayaran-paket">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Berlangganan</button>
                                </Link>  
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
