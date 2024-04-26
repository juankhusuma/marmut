"use client";

import { handleUserLogin } from "@/action/handleUserLogin";
import { triggerToast } from "@/utils/toast";
import { FormEvent } from "react";

export default function Login() {
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        console.log(formData);
        try {
            const authenticated = await handleUserLogin(formData);
            if (authenticated) {
                triggerToast("success", "You're logged in!");
                localStorage.setItem("email", formData.get("email") as string);
            } else {
                triggerToast("error", "Email or password is wrong!");
            }
        } catch {
            triggerToast("error", "There's a problem logging you in!");
            return;
        }
    }

    return (
        <div className="flex justify-center items-center p-10">
            <form onSubmit={handleSubmit} className="form-control">
                <h1 className="text-center text-white font-bold mb-10">Form Login</h1>
                <label htmlFor="email" className="label-text">Email</label>
                <input className="input-sm input-primary mb-2" type="text" name="email" />
                <label htmlFor="email" className="label-text">Password</label>
                <input className="input-sm input-primary mb-2" type="password" name="password" />
                <button type="submit" className="btn btn-primary mt-5 text-white font-bold">Login</button>
            </form>
        </div>
    )
}