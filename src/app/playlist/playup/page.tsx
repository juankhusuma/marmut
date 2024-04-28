'use client';

export default function seeplaylist() {
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
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>Judul Lagu</th>
                            <th>Oleh</th>
                            <th>Durasi</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Song1</th>
                            <th>Artist1</th>
                            <th>3 Minutes</th>
                            <th>
                                <div className="flex flex-col">
                                    <a href="#">Lihat</a>
                                    <a href="#">Play</a>
                                    <a href="#">Hapus</a>
                                </div>
                            </th>
                        </tr>
                        <tr>
                            <th>Song1</th>
                            <th>Artist1</th>
                            <th>3 Minutes</th>
                            <th>
                                <div className="flex flex-col">
                                    <a href="#">Lihat</a>
                                    <a href="#">Play</a>
                                    <a href="#">Hapus</a>
                                </div>
                            </th>
                        </tr>
                        <tr>
                            <th>Song1</th>
                            <th>Artist1</th>
                            <th>3 Minutes</th>
                            <th>
                                <div className="flex flex-col">
                                    <a href="#">Lihat</a>
                                    <a href="#">Play</a>
                                    <a href="#">Hapus</a>
                                </div>
                            </th>
                        </tr>
                        <tr>
                            <th>Song1</th>
                            <th>Artist1</th>
                            <th>3 Minutes</th>
                            <th>
                                <div className="flex flex-col">
                                    <a href="#">Lihat</a>
                                    <a href="#">Play</a>
                                    <a href="#">Hapus</a>
                                </div>
                            </th>
                        </tr>
                        <tr>
                            <th>Song1</th>
                            <th>Artist1</th>
                            <th>3 Minutes</th>
                            <th>
                                <div className="flex flex-col">
                                    <a href="#">Lihat</a>
                                    <a href="#">Play</a>
                                    <a href="#">Hapus</a>
                                </div>
                            </th>
                        </tr>
                        <tr>
                            <th>Song1</th>
                            <th>Artist1</th>
                            <th>3 Minutes</th>
                            <th>
                                <div className="flex flex-col">
                                    <a href="#">Lihat</a>
                                    <a href="#">Play</a>
                                    <a href="#">Hapus</a>
                                </div>
                            </th>
                        </tr>
                        <tr>
                            <th>Song1</th>
                            <th>Artist1</th>
                            <th>3 Minutes</th>
                            <th>
                                <div className="flex flex-col">
                                    <a href="#">Lihat</a>
                                    <a href="#">Play</a>
                                    <a href="#">Hapus</a>
                                </div>
                            </th>
                        </tr>
                        <tr>
                            <th>Song1</th>
                            <th>Artist1</th>
                            <th>3 Minutes</th>
                            <th>
                                <div className="flex flex-col">
                                    <a href="#">Lihat</a>
                                    <a href="#">Play</a>
                                    <a href="#">Hapus</a>
                                </div>
                            </th>
                        </tr>
                        <tr>
                            <th>Song1</th>
                            <th>Artist1</th>
                            <th>3 Minutes</th>
                            <th>
                                <div className="flex flex-col">
                                    <a href="#">Lihat</a>
                                    <a href="#">Play</a>
                                    <a href="#">Hapus</a>
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