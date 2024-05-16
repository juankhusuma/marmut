export default function CreatePodcastEpisodePage() {
    return (
        <div className="flex justify-center p-10">
            <form className="form-control gap-5 border-white border p-10">
                <h1 className="font-bold text-center">CREATE EPISODE</h1>
                <h2>Podcast: Podcast 1</h2>
                <div>
                    <label htmlFor="judul" className="label-text">Judul:</label>
                    <input className="ml-2 input-sm input input-primary" type="text" name="judul" id="" />
                </div>
                <div>
                    <label htmlFor="deskripsi" className="label-text">Deskripsi:</label>
                    <input type="text" className="ml-2 input-sm input input-primary" name="deskripsi"></input>
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