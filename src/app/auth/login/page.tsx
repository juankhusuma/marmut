"use client";

import { handleUserLogin } from "@/action/handleUserLogin";

export default function Login() {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        localStorage.setItem("email", formData.get("email") as string);
        try {
            await handleUserLogin(formData);
        } catch (error) {
            console.error(error);
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