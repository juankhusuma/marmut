import Link from 'next/link';

export default function SearchBar() {
    const isFound = true; 
  return (
<div className="flex flex-col items-center min-h-screen bg-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-lg text-gray-900 w-full max-w-md">
        <div className="text-lg mb-4 font-semibold">Search Bar</div>
        <div>
          <label htmlFor="query" className="sr-only">Query:</label>
          <input
            type="text"
            id="query"
            name="query"
            placeholder="Craving some tunes, podcasts, or songs?"
            className="px-4 py-2 border border-gray-300 rounded-md w-full text-white bg-gray-700 placeholder-gray-300"
          />
        </div>
        <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block w-full">
          CARI
        </button>
      </div>
    {isFound&&(<div className="bg-white p-8 mt-6 rounded-lg shadow-lg text-gray-900 w-full max-w-4xl">
        <h2 className="text-lg mb-4 font-semibold">Hasil Pencarian "love"</h2>
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Tipe</th>
              <th scope="col" className="px-6 py-3">Judul</th>
              <th scope="col" className="px-6 py-3">Oleh</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b">
              <td className="px-6 py-4">SONG</td>
              <td className="px-6 py-4">Love is in the air</td>
              <td className="px-6 py-4">Artist1</td>
              <td className="px-6 py-4">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-800">Lihat</a>
              </td>
            </tr>
            <tr className="bg-white border-b">
              <td className="px-6 py-4">SONG</td>
              <td className="px-6 py-4">What is love</td>
              <td className="px-6 py-4">Artist2</td>
              <td className="px-6 py-4">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-800">Lihat</a>
              </td>
            </tr>
            <tr className="bg-white border-b">
              <td className="px-6 py-4">PODCAST</td>
              <td className="px-6 py-4">Love is Blind Pod</td>
              <td className="px-6 py-4">Podcaster1</td>
              <td className="px-6 py-4">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-800">Lihat</a>
              </td>
            </tr>
            <tr className="bg-white">
              <td className="px-6 py-4">USER PLAYLIST</td>
              <td className="px-6 py-4">90s Love Songs</td>
              <td className="px-6 py-4">User1</td>
              <td className="px-6 py-4">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-800">Lihat</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>)}
{!isFound&&(      <div className="bg-white p-6 rounded-lg shadow-lg text-gray-900 mx-4 mt-6 mb-20">
        <h2 className="text-lg font-semibold text-center">Maaf, pencarian untuk "love" tidak ditemukan</h2>
      </div>)}
    </div>
  );
}
