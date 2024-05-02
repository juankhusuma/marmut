'use client';

export default function AddPlaylistPage() {
    return (
        <div className="flex justify-center items-center p-10">
            <form className="form-control">
                <h1 className="text-3xl mb-5 font-bold text-center">Tambah Playlist</h1>
                <label htmlFor="email" className="label-text">Judul</label>
                <input className="input-sm input-primary mb-2" type="text" name="judul" />
                <label htmlFor="email" className="label-text">Deskripsi</label>
                <input className="input-sm input-primary mb-10" type="text" name="deskripsi" />
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}