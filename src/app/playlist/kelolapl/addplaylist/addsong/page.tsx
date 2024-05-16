'use client';

export default function songtopl() {
    return (
        <div className="flex flex-col justify-center items-center p-10 space-y-1">
            <h1 className="text-3xl font-bold">Tambah Lagu</h1>
            <p>Playlist 1</p>
            <div>
                <form className="form-control">
                    <div className="flex gap-2 mb-20">
                        <label htmlFor="Playlist">Lagu:</label>
                        <select name="playlist" id="pl">
                            <option value="pl1">Lagu 1</option>
                            <option value="pl2">Lagu 2</option>
                            <option value="pl3">Lagu 3</option>
                            <option value="pl4">Lagu 4</option>
                        </select>
                    </div>

                    <input type="submit" value="[Submit]" className="btn btn-primary" />
                </form>
            </div>
        </div>
    )
}