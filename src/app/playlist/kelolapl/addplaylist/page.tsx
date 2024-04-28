'use client';

export default function addplaylist() {
    return (
        <div className="flex flex-col justify-center items-center space-y-5">
            <h1 className="text-3xl font-bold text-center">Tambah Playlist</h1>
            <div className="flex flex-col">
                <label htmlFor="email" className="label-text">Judul</label>
                <input className="input-sm input-primary mb-2" type="text" name="judul" />
            </div>
            <div className="flex flex-col">
                <label htmlFor="email" className="label-text">Deskripsi</label>
                <input className="input-sm input-primary mb-2" type="text" name="deskripsi" />
            </div>
            <button className="btn btn-primary">Submit</button>
        </div>
    )
}