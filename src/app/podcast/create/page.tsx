export default function CreatePodcastPage() {
    return (
        <div className="flex justify-center p-10">
            <form className="form-control gap-5 border-white border p-10">
                <h1 className="font-bold text-center">CREATE PODCAST</h1>
                <div>
                    <label htmlFor="judul" className="label-text">Judul:</label>
                    <input className="ml-2 input-sm input input-primary" type="text" name="judul" id="" />
                </div>
                <div>
                    <label htmlFor="genre" className="label-text">Genre:</label>
                    <select className="select-sm select select-primary ml-2" name="genre" id="">
                        <option value="" hidden selected disabled>Pilih Genre</option>
                        <option value="1">Horror</option>
                        <option value="1">Action</option>
                        <option value="1">Drama</option>
                        <option value="1">Teknologi</option>
                        <option value="1">Lainya</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="durasi" className="label-text">Durasi:</label>
                    <input className="ml-2 input-sm input input-primary" type="text" name="durasi" id="" />
                </div>
                <input type="submit" value="Submit" className="btn btn-primary" />
            </form>
        </div>
    )
}