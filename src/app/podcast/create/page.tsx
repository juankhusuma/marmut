import { checkUser } from "@/action/checkUser";
import { handleCreatePodcast } from "@/action/handleCreatePodcast";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";

export default async function CreatePodcastPage() {
    const genres = (await sql`SELECT DISTINCT genre FROM genre`).rows;
    const user = await checkUser();
    if (user === null) {
        redirect("/auth/login")
    }
    if (!user.roles.includes("PODCASTER")) {
        redirect("/")
    }
    return (
        <div className="flex justify-center p-10">
            <form action={handleCreatePodcast} className="form-control gap-5 border-white border p-10">
                <input type="hidden" name="email" value={user.email} />
                <h1 className="font-bold text-center">CREATE PODCAST</h1>
                <div>
                    <label htmlFor="judul" className="label-text">Judul:</label>
                    <input className="ml-2 input-sm input input-primary" type="text" name="judul" id="" />
                </div>
                <div>
                    <label htmlFor="genre" className="label-text">Genre:</label>
                    <div className="h-[200px] overflow-y-auto">
                        {genres.map(g => (
                            <label key={g.genre} className="flex my-2 items-center">
                                <input type="checkbox" name="genre" value={g.genre} className="checkbox" />
                                <span className="ml-2">{g.genre}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <input type="submit" value="Submit" className="btn btn-primary" />
            </form>
        </div>
    )
}