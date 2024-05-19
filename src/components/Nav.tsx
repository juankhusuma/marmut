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
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>Item 1</a></li>
                        <li>
                            <a>Parent</a>
                            <ul className="p-2">
                                <li><a>Submenu 1</a></li>
                                <li><a>Submenu 2</a></li>
                            </ul>
                        </li>
                        <li><a>Item 3</a></li>
                    </ul>
                </div>
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
    const isArtist = (roles.includes("ARTIST") || roles.includes("SONGWRITER")) && !isLabel;
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
            {isPodcaster && <Link href="/podcast/create" className="btn btn-sm text-xs">Kelola Podcast</Link>}
            {isArtist && <Link href="/album-song/user" className="btn btn-sm text-xs">Kelola Album & Songs</Link>}
            {isLabel && <Link href="/album-song/label" className="btn btn-sm text-xs">Kelola Album</Link>}
            {(isLabel || isArtist) && <Link href="/royalty" className="btn btn-sm text-xs">Cek Royalti</Link>}
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