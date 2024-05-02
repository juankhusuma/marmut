import Link from 'next/link';

export default function RiwayatPaket() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="w-auto">
                <div className="bg-white shadow overflow-hidden rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 text-center">RIWAYAT TRANSAKSI PAKET</h3>
                    </div>
                    <div className="border-t border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-deep-blue">
                                <tr>
                                    <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                                        Jenis
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                                        Tanggal Dimulai
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                                        Tanggal Berakhir
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                                        Metode Pembayaran
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                                        Nominal
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 text-center">
                              <tr>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    1 Bulan
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    8 April 2024,
                                    23:00
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    8 Mei 2024,
                                    23:00
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    E-Wallet
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    Rp54.900
                                  </td>
                              </tr>
                              <tr>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    1 Bulan
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    8 April 2024,
                                    23:00
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    8 Mei 2024,
                                    23:00
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    E-Wallet
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    Rp54.900
                                  </td>
                              </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-center py-5">
                        <Link href="/">
                            <button className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
                                Kembali
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}