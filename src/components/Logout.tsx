"use client";

import { handleUserLogout } from "@/action/handleUserLogout";

export default function LogoutButton() {
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            await handleUserLogout();
            localStorage.removeItem("email");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <button type="submit" className="btn btn-sm text-xs">Logout</button>
        </form>
    )
}