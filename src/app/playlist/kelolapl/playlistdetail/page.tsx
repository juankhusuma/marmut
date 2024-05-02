'use client';

export default function seeplaylistdetail() {
    return (
        <div className="flex flex-col p-10 space-y-5">
            <h1 className="text-3xl font-bold text-center">User Playlist Detail</h1>
            <div>
                <p>Judul: Playlist1</p>
                <p>Pembuat: Pembuat1</p>
                <p>Jumlah lagu: 12</p>
                <p>Total Durasi: 8 jam 20 menit</p>
                <p>Tanggal Dibuat: 18/03/24</p>
                <p>Deskripsi: Lorem Ipsum</p>
            </div>
            <a href="#" className="text-center">Shuffle Play</a>
            <a href="#" className="text-center">Kembali</a>
            <h1 className="text-center">Daftar Lagu</h1>
            <div className="overflow-y-auto h-96">
                <table className="table table-zebra table-auto w-full">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2">Judul Lagu</th>
                            <th className="px-4 py-2">Oleh</th>
                            <th className="px-4 py-2">Durasi</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-black-200">
                            <th className="border px-4 py-2">Song1</th>
                            <th className="border px-4 py-2">Artist1</th>
                            <th className="border px-4 py-2">3 Minutes</th>
                            <th className="border px-4 py-2">
                                <div className="flex flex-col">
                                    <a href="#">[Lihat]</a>
                                    <a href="#">[Play]</a>
                                    <a href="#">[Hapus]</a>
                                </div>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
            <a href="#" className="btn btn-primary">Tambah Lagu</a>
        </div>
    )
}