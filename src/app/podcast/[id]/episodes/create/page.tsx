import { checkUser } from "@/action/checkUser";
import { handleCreateEpisode } from "@/action/handleCreateEpisode";
import { redirect } from "next/navigation";

export default async function CreatePodcastEpisodePage({ params }: { params: { id: string } }) {
    const user = await checkUser();
    const isLoggedIn = user !== null;

    if (!isLoggedIn) {
        redirect("/auth/login")
    }

    if (!user.roles.includes("PODCASTER")) {
        redirect("/")
    }

    return (
        <div className="flex justify-center p-10">
            <form action={handleCreateEpisode} className="form-control gap-5 border-white border p-10">
                <input type="hidden" name="uid" value={params.id} />
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