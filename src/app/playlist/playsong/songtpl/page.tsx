'use client';

export default function songtopl() {
    return (
        <div className="flex flex-col justify-center items-center p-10 space-y-1">
            <h1 className="text-3xl font-bold">Add Song To User Playlist</h1>
            <p>Judul: Song1</p>
            <p>Artist: Artist1</p>
            <div>
                <form className="form-control">
                    <label htmlFor="Playlist">Playlist:</label>
                    <select name="playlist" id="pl">
                        <option value="pl1">Playlist1</option>
                        <option value="pl2">Playlist2</option>
                        <option value="pl3">Playlist3</option>
                        <option value="pl4">Playlist4</option>
                    </select>
                </form>
            </div>
            <br />
            <a href="#">Tambah</a>
            <a href="#">Kembali</a>
        </div>
    )
}