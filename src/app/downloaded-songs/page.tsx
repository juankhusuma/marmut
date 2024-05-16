import Link from 'next/link';

export default function DownloadedSongs() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-auto">
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 text-center">DAFTAR LAGU</h3>
          </div>
          <div className="border-t border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-deep-blue">
                <tr>
                  <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                    Judul Lagu
                  </th>
                  <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                    Oleh
                  </th>
                  <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                    Tanggal Download
                  </th>
                  <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-center">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    Song1
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    Tsabit Coda
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    20/02/2024
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link href="/album-song/user/albumdetails">
                      <button className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded mr-2">
                        Lihat
                      </button>
                    </Link>
                    <a href="#" className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">Hapus</a>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    Song2
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    Tsabit Coda
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    24/02/2024
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link href="/album-song/user/albumdetails">
                      <button className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded mr-2">
                        Lihat
                      </button>
                    </Link>
                    <a href="#" className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">Hapus</a>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    Song3
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    Masih Tsabit
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    27/02/2024
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap text-right text-sm font-medium">
                    <Link href="/album-song/user/albumdetails">
                      <button className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded mr-2">
                        Lihat
                      </button>
                    </Link>
                    <a href="#" className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">Hapus</a>
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
