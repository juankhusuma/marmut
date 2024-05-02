import React from 'react';

export default function PembayaranPaket() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="bg-white p-6 rounded-lg shadow-lg text-gray-900 max-w-md w-full">
                <h3 className="text-lg font-semibold text-center mb-4">PEMBAYARAN PAKET</h3>
                
                <div className="mb-4">
                    <h4 className="font-medium mb-2">Informasi Paket yang Ingin Dibeli:</h4>
                    <table className="min-w-full border">
                        <thead>
                            <tr>
                                <th className="border px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Jenis</th>
                                <th className="border px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Harga</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border px-6 py-4">1 Bulan</td>
                                <td className="border px-6 py-4">Rp54.900</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="mb-6">
                <label htmlFor="genre" className="block text-sm font-medium text-gray-700">Metode Pembayaran:</label>
                    <select id="genre" name="genre" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                        <option value="" disabled selected>Choose payment method</option>
                        <option value="bank_transfer">Bank Transfer</option>
                        <option value="credit_card">Credit Card</option>
                        <option value="e_wallet">E-Wallet</option>
                    </select>
                </div>
                <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    SUBMIT
                </button>
            </div>
        </div>
    );
}
