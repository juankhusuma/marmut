"use server"

import { checkUser } from "@/action/checkUser";
import { handleUserLogout } from "@/action/handleUserLogout";
import Link from "next/link";

export default async function Nav() {
    const user = await checkUser();

    const loggedIn = user !== null;

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <Link href="/" className="btn btn-ghost text-xl">Marmut</Link>
            </div>
            {
                loggedIn ? <AuthorizedNav /> : <UnauthorizedNav />
            }
        </div>
    )
}

async function AuthorizedNav() {
    const user = await checkUser();
    const roles = user!.roles;
    const isLabel = roles.includes("LABEL");
    const isPremium = roles.includes("PREMIUM") && !isLabel;
    const isPodcaster = roles.includes("PODCASTER") && !isLabel;
    const isArtist = roles.includes("ARTIST") && !isLabel;
    return (
        <div className="navbar-end gap-2">
            <Link href="/" className="btn btn-sm text-xs">Dashboard</Link>
            {!isLabel && <Link href="/playlist/chart" className="btn btn-sm text-xs">Chart</Link>}
            {!isLabel && (<form className="flex">
                <input type="text" className="input input-sm input-bordered" name="" id="" />
                <input type="submit" value="Search" className="btn btn-sm text-xs" />
            </form>)}
            {!isLabel && <Link href="/playlist/kelolapl" className="btn btn-sm text-xs">Kelola Playlist</Link>}
            {!isLabel && <Link href="/playlist/kelolapl" className="btn btn-sm text-xs">Langganan Paket</Link>}
            {isPremium && <Link href="/downloaded-songs" className="btn btn-sm text-xs">Kelola Downloads & Songs</Link>}
            {isPodcaster && <Link href="/playlist/list" className="btn btn-sm text-xs">Kelola Podcast</Link>}
            {isArtist && <Link href="/playlist/list" className="btn btn-sm text-xs">Kelola Album & Songs</Link>}
            {isLabel && <Link href="/playlist/list" className="btn btn-sm text-xs">Kelola Album</Link>}
            {(isLabel || isArtist) && <Link href="/playlist/list" className="btn btn-sm text-xs">Cek Royalti</Link>}
            <form action={handleUserLogout}>
                <button type="submit" className="btn btn-sm text-xs">Logout</button>
            </form>
        </div>
    )
}

function UnauthorizedNav() {
    return (
        <div className="navbar-end gap-5">
            <Link href="/auth/login" className="btn">Login</Link>
            <Link href="/auth/register" className="btn">Registrasi</Link>
        </div>
    )
}